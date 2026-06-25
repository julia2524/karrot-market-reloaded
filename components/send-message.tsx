"use client";

import { useEffect, useRef } from "react";
import Input from "./input";
import { useFormState } from "react-dom";
import { MessagesType } from "./chat-section";
import { sendMessage } from "@/app/chats/[id]/actions";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";

interface SendMessageProps {
  chatRoomId: string;
  userId: number;
  onMessageSended: (message: MessagesType[number]) => void;
}

type MessageState = {
  error: any;
  success: boolean;
} | null;
export default function SendMessage({
  chatRoomId,
  userId,
  onMessageSended,
}: SendMessageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  //  const sendMessageWithId = sendMessage.bind(null, chatRoomId, userId);
  const channel = useRef<RealtimeChannel | null>(null);

  const SUPABASE_URL = "https://udglrldgcyprndvwuwwp.supabase.co";
  const SUPABASE_PUBLIC_KEY = "sb_publishable_zJrYTDvgXagoGWdmLaZ4Zw_lI3X7MAJ";
  const sendMessageWithId = async (
    prevState: MessageState,
    formData: FormData
  ) => {
    const payload = formData.get("message") as string;
    if (!payload.trim()) {
      formRef.current?.reset();
      return {
        error: {
          formErrors: ["메시지를 입력해주세요"],
        },
        success: false,
      };
    }
    onMessageSended({
      id: Math.random(),
      payload,
      created_at: new Date(),
      userId,
    } as MessagesType[number]);

    formRef.current?.reset();
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: { id: Math.random(), payload, created_at: new Date(), userId },
    });
    return sendMessage(chatRoomId, userId, prevState, formData);
  };
  const [state, action] = useFormState(sendMessageWithId, null);

  //   useEffect(() => {
  //     if (state?.success) {
  //       formRef.current?.reset();
  //     }
  //   }, [state]);
  return (
    <form
      ref={formRef}
      action={action}
      className="absolute bottom-0 bg-neutral-900 max-w-screen-sm w-full p-5"
    >
      <Input
        name="message"
        placeholder="메시지 보내기"
        errors={state?.error?.formErrors ?? []}
        minLength={1}
        maxLength={200}
        type="text"
      />
    </form>
  );
}
