"use client";

import { getMoreLives, InitialLives } from "@/app/(tab)/live/actions";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

interface LiveListProps {
  initialLives: InitialLives;
}

export default function LiveList({ initialLives }: LiveListProps) {
  const [state, action] = useFormState(getMoreLives, {
    lives: initialLives,
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
      {state.lives.map((live) => (
        <Link href={`/streams/${live.id}`} key={live.id}>
          <div className="flex flex-row gap-5 p-5">
            <div className="size-24 rounded-xl overflow-hidden bg-neutral-700 relative">
              {live.user.avatar ? (
                <Image
                  src={live.user.avatar}
                  alt={live.user.username}
                  fill
                  unoptimized
                  className="object-cover bg-neutral-700"
                />
              ) : (
                <UserIcon className="size-24" />
              )}
              <div className="rounded-2xl absolute bottom-1 right-1 bg-red-600 px-2 text-white font-bold animate-pulse">
                LIVE
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="font-semibold text-white text-2xl ">
                {live.title}
              </div>
              <div className="flex flex-row items-center  text-neutral-400">
                {live.user.username}
              </div>
            </div>
          </div>
          <div className="border-b m-3 border-neutral-600" />
        </Link>
      ))}
      <form action={action} className="mb-28 items-center flex justify-center ">
        <div ref={trigger}>
          {state.isLastPage ? (
            <div className="p-5">더 이상 라이브채널이 없습니다.</div>
          ) : (
            <div className="h-10 w-96 rounded-full bg-neutral-800" />
          )}
        </div>
      </form>
    </>
  );
}
