import { formatToAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface UserIconProps {
  photo: string;
  username: string;
  created_at: Date;
}

export default function UserIconBox({
  photo,
  username,
  created_at,
}: UserIconProps) {
  return (
    <div className="flex flex-row gap-3">
      <div className="relative size-10 flex items-center justify-center  ">
        {photo ? (
          <Image
            src={photo}
            alt={username}
            fill
            unoptimized
            className="rounded-full"
          />
        ) : (
          <UserIcon className="bg-neutral-800 rounded-full size-9" />
        )}
      </div>
      <div className="">
        <div className="text-sm font-bold">{username}</div>
        <div className="text-sm">{formatToAgo(created_at.toString())}</div>
      </div>
    </div>
  );
}
