"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as ChatOutlineIcon,
  HomeIcon as HomeOutlineIcon,
  NewspaperIcon as NewspaperOutlineIcon,
  VideoCameraIcon as VideoOutlineIcon,
  UserIcon as UserOutlineIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon as ChatSolidIcon,
  HomeIcon as HomeSolidIcon,
  NewspaperIcon as NewspaperSolidIcon,
  VideoCameraIcon as VideoSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-between px-5 py-3 mx-auto w-full max-w-screen-sm font-semibold bg-neutral-800 fixed bottom-0 *:flex *:flex-col *:items-center">
      <Link href="/home" className="flex flex-col items-center">
        {pathname === "/home" ? (
          <HomeSolidIcon className="size-8" />
        ) : (
          <HomeOutlineIcon className="size-8" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/life">
        {pathname === "/life" ? (
          <NewspaperSolidIcon className="size-8" />
        ) : (
          <NewspaperOutlineIcon className="size-8" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/chat">
        {pathname === "/chat" ? (
          <ChatSolidIcon className="size-8" />
        ) : (
          <ChatOutlineIcon className="size-8" />
        )}
        <span>채팅</span>
      </Link>
      <Link href="/live">
        {pathname === "/live" ? (
          <VideoSolidIcon className="size-8" />
        ) : (
          <VideoOutlineIcon className="size-8" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href="/profile">
        {pathname === "/profile" ? (
          <UserSolidIcon className="size-8" />
        ) : (
          <UserOutlineIcon className="size-8" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
