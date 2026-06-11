import TabHeader from "@/components/tab-header";
import getUser, { logout } from "./actions";
import Button from "@/components/button";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-3 max-w-screen-sm ">
      <TabHeader header="나의 당근" />
      <div className="mx-5 p-3 h-20 flex items-center text-2xl uppercase rounded-md font-semibold  bg-neutral-700 gap-2">
        <span>{user?.username}</span>
      </div>
      <div className="mx-5">
        <form action={logout}>
          <Button text="로그아웃" />
        </form>
      </div>
    </div>
  );
}
