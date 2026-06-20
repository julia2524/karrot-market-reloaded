"use client";
import { formatToAgo } from "@/lib/utils";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { getMorePosts, InitialPosts } from "@/app/(tab)/life/actions";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

interface PostListProps {
  initialPosts: InitialPosts;
}

export default function PostList({ initialPosts }: PostListProps) {
  const [state, action] = useFormState(getMorePosts, {
    posts: initialPosts,
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
      {state.posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id} className="">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-2">
              <div className="text-lg text-white font-bold">{post.title}</div>
              <div className="text-white">{post.description}</div>
            </div>
            <div className="text-sm text-neutral-400 flex flex-row items-center justify-between w-full">
              <div className="flex gap-2">
                <span>{formatToAgo(post.created_at.toString())}</span>
                <span>•</span>
                <span>조회 {post.views}</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex items-center gap-1">
                  <HandThumbUpIcon className="size-5" />
                  <span> {post._count.likes} </span>
                </div>
                <div className="flex items-center gap-1">
                  <ChatBubbleBottomCenterIcon className="size-5" />
                  <span>{post._count.comments}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b m-3 border-neutral-600" />
        </Link>
      ))}

      <form action={action} className="mb-28 items-center flex justify-center ">
        <div ref={trigger}>
          {state.isLastPage ? (
            <div className="p-5">더 이상 게시글이 없습니다.</div>
          ) : (
            <div className="h-10 w-96 rounded-full bg-neutral-800" />
          )}
        </div>
      </form>
    </>
  );
}
