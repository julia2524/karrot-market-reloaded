import { formatToTime } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface MessageBubbleProps {
  payload: string;
  isMyMessage: boolean;
  photo: string | null;
  created_at: Date;
}

export default function MessageBubble({
  payload,
  isMyMessage,
  photo,
  created_at,
}: MessageBubbleProps) {
  // console.log("메시지 생성 시간", created_at);
  return (
    <div
      className={`flex gap-2 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`rounded-full size-10 bg-neutral-500 flex items-center justify-center relative overflow-hidden ${
          isMyMessage ? "hidden" : "block"
        }`}
      >
        {photo ? (
          <Image src={photo} alt={photo} fill unoptimized />
        ) : (
          <UserIcon className="size-8" />
        )}
      </div>

      <div
        className={`w-fit rounded-2xl px-3 py-2 ${
          isMyMessage ? "bg-orange-500" : "bg-neutral-500 "
        }`}
      >
        {payload}
      </div>

      <div className="flex items-end shrink-0">
        {formatToTime(new Date(created_at))}
      </div>
    </div>
  );
}
