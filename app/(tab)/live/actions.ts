"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export async function getInitLives() {
  return await db.streaming.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
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
    take: 5,
  });
}

const getCachedInitLives = unstable_cache(getInitLives, ["initialLives"], {
  tags: ["initialLives"],
  revalidate: 60,
});
export async function getLives() {
  return await getCachedInitLives();
}
export type InitialLives = Prisma.PromiseReturnType<typeof getLives>;

interface PrevStateProps {
  lives: InitialLives;
  page: number;
}
export async function getMoreLives(prevState: PrevStateProps) {
  const nextPage = prevState.page + 1;
  const newLives = await db.streaming.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
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
    take: 5,
    skip: nextPage * 5,
  });
  return {
    lives: [...prevState.lives, ...newLives],
    page: nextPage,
    isLastPage: newLives.length === 0,
  };
}
