"use server";

import { CommentState } from "@/components/add-comment";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import z from "zod";

export async function getPost(id: number) {
  return await db.post.findUnique({
    where: {
      id,
    },
    select: {
      created_at: true,
      title: true,
      description: true,
      views: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
}
const getCachedPost = (id: number) =>
  unstable_cache(() => getPost(id), [`post-${id}`], { tags: [`post-${id}`] })();
export async function getPostByCache(id: number) {
  return await getCachedPost(id);
}
export type PostType = Prisma.PromiseReturnType<typeof getPostByCache>;

export async function incrementPostViews(id: number) {
  await db.post.update({
    where: { id },
    data: {
      views: { increment: 1 },
    },
  });

  revalidateTag(`post-${id}`);
  revalidateTag("initialPosts");
}

export async function getLikeCount(id: number) {
  return await db.post.findUnique({
    where: {
      id,
    },
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
}
const getCachedLike = (id: number) =>
  unstable_cache(() => getLikeCount(id), [`post-like-${id}`], {
    tags: [`post-like-${id}`],
  })();
export async function getLikeByCache(id: number) {
  return await getCachedLike(id);
}

export async function getIsLike(userId: number, postId: number) {
  const isLike = await db.like.findUnique({
    where: {
      id: {
        userId,
        postId,
      },
    },
  });
  return Boolean(isLike);
}
export const onLike = async (postId: number, userId: number) => {
  await db.like.create({
    data: {
      userId,
      postId,
    },
  });
  revalidateTag(`post-like-${postId}`);
};

export const onDisLike = async (postId: number, userId: number) => {
  await db.like.delete({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  revalidateTag(`post-like-${postId}`);
};

export async function getComments(id: number) {
  return await db.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

const getCachedComments = (id: number) =>
  unstable_cache(() => getComments(id), [`comments-${id}`], {
    tags: [`comments-${id}`],
  })();

export async function getCommentsByCache(id: number) {
  return await getCachedComments(id);
}

export type CommentsType = Prisma.PromiseReturnType<typeof getCommentsByCache>;
const commentSchema = z
  .string()
  .min(1, "댓글은 1~200자 사이로 작성해주세요.")
  .max(200, "댓글은 1~200자 사이로 작성해주세요.");

export async function addComment(
  postId: number,
  userId: number,
  _prevState: CommentState,
  formData: FormData
) {
  const comment = formData.get("comment");
  const result = await commentSchema.safeParseAsync(comment);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      success: false,
    };
  } else {
    await db.comment.create({
      data: {
        payload: result.data,
        user: {
          connect: { id: userId },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
    revalidateTag(`comments-${postId}`);
    revalidateTag("initialPosts");
  }
  return {
    error: null,
    success: true,
  };
}
