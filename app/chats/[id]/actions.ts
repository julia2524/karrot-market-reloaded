"use server";
import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";

export async function chatInfo(chatRoomId: string) {
  return await db.chatRoom.findUnique({
    where: {
      id: chatRoomId,
    },
    select: {
      id: true,
      buyer: {
        select: {
          avatar: true,
          username: true,
          id: true,
        },
      },
      seller: {
        select: {
          avatar: true,
          username: true,
          id: true,
        },
      },
      product: {
        select: {
          title: true,
          id: true,
          photo: true,
          price: true,
        },
      },
      messages: {
        orderBy: {
          created_at: "asc",
        },
        select: {
          payload: true,
          created_at: true,
          id: true,
          userId: true,
        },
      },
      created_at: true,
    },
  });
}
const messageSchema = z
  .string()
  .min(1, "메시지는 1~200자 사이로 작성해주세요.")
  .max(200, "메시지는 1~200자 사이로 작성해주세요.");

export async function sendMessage(
  chatRoomId: string,
  userId: number,
  _prevState: any,
  formData: FormData
) {
  const message = formData.get("message");
  const result = await messageSchema.safeParseAsync(message);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      success: false,
    };
  } else {
    await db.message.create({
      data: {
        payload: result.data,
        user: {
          connect: { id: userId },
        },
        room: {
          connect: { id: chatRoomId },
        },
      },
    });
    await db.chatRoom.update({
      where: {
        id: chatRoomId,
      },
      data: {
        updated_at: new Date(),
      },
    });
    revalidatePath(`/chats/${chatRoomId}`);
    revalidatePath("/chat");
    return {
      error: null,
      success: true,
    };
  }
}
