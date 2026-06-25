"use client";
import { useOptimistic } from "react";
import MessageSection from "./message-section";
import SendMessage from "./send-message";

export type MessagesType = {
  userId: number;
  id: number;
  created_at: Date;
  payload: string;
}[];
interface ChatSectionProps {
  otherUser: {
    id: number;
    username: string;
    avatar: string | null;
  };
  chatRoomId: string;
  userId: number;
  initialMessages: MessagesType;
}
export default function ChatSection({
  otherUser,
  chatRoomId,
  userId,
  initialMessages,
}: ChatSectionProps) {
  const [optimisticMessages, sendOptimisticMessage] = useOptimistic(
    initialMessages,
    (prev, newMessage: MessagesType[number]) => [...prev, newMessage]
  );
  console.log("optimisticMessages", optimisticMessages);
  return (
    <>
      <div className="flex-1 overflow-y-auto mb-20">
        <MessageSection
          otherUser={otherUser}
          chatRoomId={chatRoomId}
          messages={optimisticMessages}
        />
      </div>
      <SendMessage
        chatRoomId={chatRoomId}
        userId={userId}
        onMessageSended={sendOptimisticMessage}
      />
    </>
  );
}
