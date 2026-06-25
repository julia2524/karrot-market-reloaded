import { InitialChats } from "@/app/(tab)/chat/actions";
import { formatToAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface ChatListItemProps {
  chat: InitialChats[number];
  userId: number;
}

export default function ChatListItem({ chat, userId }: ChatListItemProps) {
  //  console.log(chat);
  //console.log(userId);
  const otherUser = chat.seller.id === userId ? chat.buyer : chat.seller;
  const lastMessage = chat.messages[0];
  // console.log("otherUser: ", otherUser.username);
  //console.log("last Message: ", lastMessage);
  return (
    <Link href={`/chats/${chat.id}`} key={chat.id}>
      <div className="flex flex-row gap-5 p-5">
        <div className="size-16 rounded-xl overflow-hidden bg-neutral-700 relative">
          <Image
            src={chat.product.photo}
            alt={chat.id}
            fill
            unoptimized
            className="object-cover bg-neutral-700"
          />
          {otherUser.avatar ? (
            <Image
              src={otherUser.avatar}
              alt={otherUser.username}
              className="size-5 absolute bottom-0 right-0 rounded-full"
              unoptimized
            />
          ) : (
            <UserIcon className="size-5 absolute bottom-0 right-0 bg-neutral-700 rounded-full" />
          )}
        </div>

        <div className="flex flex-col m-2 ">
          <div className="flex flex-row gap-2 items-center">
            <span className="font-semibold text-white">
              {otherUser.username}
            </span>
            <span className="text-xs text-neutral-400">
              {formatToAgo(chat.created_at.toString())}
            </span>
          </div>
          <div className="font-semibold text-neutral-400">
            {lastMessage.payload}
          </div>
        </div>
      </div>
      <div className="border-b m-3 border-neutral-600" />
    </Link>
  );
}
