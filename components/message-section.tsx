import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import MessageBubble from "./message-bubble";
import MessageDate from "./message-date";
import React, { useEffect, useRef, useState } from "react";

interface MessageSectionProps {
  otherUser: {
    id: number;
    username: string;
    avatar: string | null;
  };
  messages: {
    id: number;
    created_at: Date;
    userId: number;
    payload: string;
  }[];
  chatRoomId: string;
}

export default function MessageSection({
  otherUser,
  messages,
  chatRoomId,
}: MessageSectionProps) {
  //console.log(messages);
  const [realTimeMessages, setRealTimeMessages] = useState(messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [realTimeMessages]);
  const channel = useRef<RealtimeChannel | null>(null);

  const SUPABASE_URL = "https://udglrldgcyprndvwuwwp.supabase.co";
  const SUPABASE_PUBLIC_KEY = "sb_publishable_zJrYTDvgXagoGWdmLaZ4Zw_lI3X7MAJ";
  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        console.log(payload);
        const newMessage = payload.payload;
        setRealTimeMessages((prev) => [...prev, newMessage]);
      })
      .subscribe();
    return () => {
      if (channel.current) {
        channel.current?.unsubscribe();
      }
    };
  }, [chatRoomId]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-4 p-5 h-full overflow-y-auto"
    >
      {realTimeMessages.map((message, index) => (
        <React.Fragment key={message.id}>
          <MessageDate
            prevMsg={realTimeMessages[index - 1]}
            nowMsgTime={message.created_at}
          />
          <MessageBubble
            payload={message.payload}
            isMyMessage={message.userId !== otherUser.id}
            photo={otherUser.avatar}
            created_at={message.created_at}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
