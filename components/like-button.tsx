"use client";

import { onDisLike, onLike } from "@/app/posts/[id]/actions";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

interface LikeProps {
  likeCount: number;
  postId: number;
  userId: number;
  isLike: boolean;
}
export default function LikeButton({
  likeCount,
  postId,
  userId,
  isLike,
}: LikeProps) {
  const onDisLikeWithId = onDisLike.bind(null, postId, userId);
  const onLikeWithId = onLike.bind(null, postId, userId);
  return (
    <form action={isLike ? onDisLikeWithId : onLikeWithId}>
      <button
        className={`flex gap-2  border self-start rounded-full p-2 items-center justify-center transition-colors ${
          isLike
            ? "bg-orange-500 hover:bg-orange-400 *:text-white border-transparent"
            : "hover:bg-neutral-800  border-neutral-500  *:text-neutral-500 "
        }`}
      >
        <HandThumbUpIcon className="size-6 " />
        <span className="">
          {isLike ? likeCount : `공감하기 (${likeCount})`}
        </span>
      </button>
    </form>
  );
}
