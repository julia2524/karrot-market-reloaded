"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

async function getInitPosts() {
  return await db.post.findMany({
    select: {
      id: true,
      description: true,
      title: true,
      created_at: true,
      views: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: 4,
  });
}

const getCachedInitPosts = unstable_cache(getInitPosts, ["initialPosts"], {
  tags: ["initialPosts"],
  revalidate: 60,
});

export async function getPosts() {
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  return await getCachedInitPosts();
}

export type InitialPosts = Prisma.PromiseReturnType<typeof getPosts>;

interface PrevStateProps {
  posts: InitialPosts;
  page: number;
}
export async function getMorePosts(prevState: PrevStateProps) {
  const nextPage = prevState.page + 1;
  const newPosts = await db.post.findMany({
    select: {
      id: true,
      description: true,
      title: true,
      created_at: true,
      views: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: 4,
    skip: nextPage * 4,
  });

  return {
    posts: [...prevState.posts, ...newPosts],
    page: nextPage,
    isLastPage: newPosts.length === 0,
  };
}
