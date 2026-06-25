"use client";
import { getMoreChats, InitialChats } from "@/app/(tab)/chat/actions";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import ChatListItem from "./chat-list-item";

interface ChatListProps {
  initialChats: InitialChats;
  userId: number;
}

export default function ChatList({ initialChats, userId }: ChatListProps) {
  const [state, action] = useFormState(getMoreChats, {
    chats: initialChats,
    page: 0,
    isLastPage: false,
  });
  const trigger = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entries[0].isIntersecting && !state.isLastPage) {
          action();
        }
      }
    );
    if (trigger.current) observer.observe(trigger.current);
    return () => observer.disconnect();
  }, [state.isLastPage, action]);

  return (
    <>
      {state.chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} userId={userId} />
      ))}
      <form action={action} className="mb-28 items-center flex justify-center ">
        <div ref={trigger}>
          {state.isLastPage ? (
            <div className="p-5">더 이상 채팅이 없습니다.</div>
          ) : (
            <div className="h-10 w-96 rounded-full bg-neutral-800" />
          )}
        </div>
      </form>
    </>
  );
}
