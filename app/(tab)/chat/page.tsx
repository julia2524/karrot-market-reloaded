import TabHeader from "@/components/tab-header";
import { getChats } from "./actions";
import ChatList from "@/components/chat-list";
import { getSession } from "@/lib/session";

export default async function Chat() {
  const initialChats = await getChats();
  const session = await getSession();
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen-sm mx-auto">
      <TabHeader header="채팅" />
      <div className="flex-grow">
        <ChatList initialChats={initialChats} userId={session.id!} />
      </div>
    </div>
  );
}
