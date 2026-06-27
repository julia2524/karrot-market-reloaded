import AddLink from "@/components/add-link";
import LiveList from "@/components/live-list";
import TabHeader from "@/components/tab-header";
import { getLives } from "./actions";

export default async function Live() {
  const initialLives = await getLives();
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen-sm mx-auto">
      <TabHeader header="쇼핑" />
      <div className="flex-grow">
        <LiveList initialLives={initialLives} />
      </div>
      <div className="fixed bottom-24 w-full max-w-screen-sm px-5 flex justify-end">
        <AddLink link="/live/add" />
      </div>
    </div>
  );
}
