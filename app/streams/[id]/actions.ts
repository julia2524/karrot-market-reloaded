"use server";
import { LiveCommentState } from "@/components/add-live-comment";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function getStream(id: number) {
  return await db.streaming.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      created_at: true,
      user: {
        select: {
          avatar: true,
          username: true,
          id: true,
        },
      },
      stream_id: true,
      stream_key: true,
    },
  });
}

export async function getLoginUser(id: number) {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
}
export async function getLiveComments(id: number) {
  return await db.liveComment.findMany({
    where: {
      streamingId: id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });
}

export type LiveCommentsType = Prisma.PromiseReturnType<typeof getLiveComments>;

const liveCommentSchema = z
  .string()
  .min(1, "댓글은 1~200자 사이로 작성해주세요.")
  .max(200, "댓글은 1~200자 사이로 작성해주세요.");

export async function addLiveComment(
  streamingId: number,
  userId: number,
  _prevState: LiveCommentState,
  formData: FormData
) {
  const liveComment = formData.get("liveComment");
  const result = await liveCommentSchema.safeParseAsync(liveComment);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      success: false,
    };
  } else {
    await db.liveComment.create({
      data: {
        payload: result.data,
        user: {
          connect: {
            id: userId,
          },
        },
        streaming: {
          connect: {
            id: streamingId,
          },
        },
      },
    });
    revalidatePath(`/streams/${streamingId}`);
  }
  return {
    error: null,
    success: true,
  };
}

export async function deleteStreaming(id: number) {
  const session = await getSession();
  if (!session.id) {
    redirect("/login");
  }
  const streaming = await db.streaming.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      stream_id: true,
    },
  });
  if (!streaming) {
    return;
  }
  if (streaming.userId !== session.id) {
    return;
  }
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/${streaming.stream_id}`,

    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const json = await response.json();
  console.log(json);
  if (!json.success) {
    console.log(json.errors);
    return;
  }

  await db.streaming.delete({
    where: {
      id,
    },
  });
  revalidateTag("initialLives");
  redirect("/live");
}
