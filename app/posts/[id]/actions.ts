"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";

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
      _count: {
        select: {
          comments: true,
        },
      },
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
  console.log("postId: ", postId), console.log("userId: ", userId);
  await db.like.create({
    data: {
      userId,
      postId,
    },
  });
  revalidateTag(`post-like-${postId}`);
};

export const onDisLike = async (postId: number, userId: number) => {
  console.log("postId: ", postId), console.log("userId: ", userId);
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
