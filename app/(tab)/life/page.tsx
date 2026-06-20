import AddLink from "@/components/add-link";
import PostList from "@/components/post-list";
import TabHeader from "@/components/tab-header";
import { getPosts } from "./actions";

export const metadata = {
  title: "동네생활",
};
export default async function Life() {
  const initialPosts = await getPosts();
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen-sm mx-auto">
      <TabHeader header="동네생활" />
      <div className="flex-grow">
        <PostList initialPosts={initialPosts} />
      </div>

      <div className="fixed bottom-24 w-full max-w-screen-sm px-5 flex justify-end">
        <AddLink link="/life/add" />
      </div>
    </div>
  );
}
