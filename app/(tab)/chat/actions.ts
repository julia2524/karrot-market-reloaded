"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

async function getInitChats(userId: number) {
  return await db.chatRoom.findMany({
    where: {
      OR: [{ sellerId: userId }, { buyerId: userId }],
      messages: {
        some: {},
      },
    },
    include: {
      messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
      product: {
        select: {
          id: true,
          photo: true,
        },
      },
      seller: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      buyer: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
    take: 4,
  });
}

const getCachedInitChats = unstable_cache(getInitChats, ["initialChats"], {
  tags: ["initialChats"],
  revalidate: 60,
});

export async function getChats() {
  const session = await getSession();
  return await getCachedInitChats(session.id!);
}

export type InitialChats = Prisma.PromiseReturnType<typeof getChats>;

interface PrevStateProps {
  chats: InitialChats;
  page: number;
}

export async function getMoreChats(prevState: PrevStateProps) {
  const session = await getSession();
  const nextPage = prevState.page + 1;
  const newChats = await db.chatRoom.findMany({
    where: {
      OR: [{ sellerId: session.id }, { buyerId: session.id }],
    },
    include: {
      messages: {
        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
      product: {
        select: {
          id: true,
          photo: true,
        },
      },
      seller: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      buyer: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },

    orderBy: {
      updated_at: "desc",
    },
    take: 4,
    skip: nextPage * 4,
  });
  return {
    chats: [...prevState.chats, ...newChats],
    page: nextPage,
    isLastPage: newChats.length === 0,
  };
}
