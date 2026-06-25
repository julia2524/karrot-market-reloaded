import Header from "@/components/header";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { chatInfo } from "./actions";
import { getSession } from "@/lib/session";
import ProductState from "@/components/product-state";
import { redirect } from "next/navigation";
import ChatSection from "@/components/chat-section";

export default async function Chat({ params }: { params: { id: string } }) {
  const chatRoomInfo = await chatInfo(params.id);
  if (!chatRoomInfo) return;
  const session = await getSession();
  if (!session) redirect("/login");
  const otherUser =
    chatRoomInfo.seller.id === session.id
      ? chatRoomInfo?.buyer
      : chatRoomInfo?.seller;
  //console.log(chatRoomInfo);
  return (
    <div className="flex flex-col h-screen">
      <Header link="/chat" icon={ChevronLeftIcon} header={otherUser.username} />
      <ProductState
        photo={chatRoomInfo.product.photo}
        title={chatRoomInfo.product.title}
        price={chatRoomInfo.product.price}
        productId={chatRoomInfo.product.id}
      />
      <ChatSection
        otherUser={otherUser}
        chatRoomId={chatRoomInfo.id}
        userId={session.id!}
        initialMessages={chatRoomInfo.messages}
      />
    </div>
  );
}
