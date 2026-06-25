import TabHeader from "@/components/tab-header";

export default function Loading() {
  return (
    <div className="relative flex flex-col min-h-screen max-w-screen-sm mx-auto">
      <TabHeader header="채팅" />
      {[...Array(10)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="flex flex-row gap-5 p-5">
            <div className="size-16 rounded-xl overflow-hidden bg-neutral-700 relative"></div>

            <div className="flex flex-col itmes-center justify-center gap-3">
              <div className="flex w-20 h-4 flex-row gap-2 bg-neutral-700 rounded-full items-center"></div>
              <div className="font-semibold w-36 h-4 bg-neutral-700 rounded-full  text-neutral-400"></div>
            </div>
          </div>
          <div className="border-b m-3 border-neutral-600" />
        </div>
      ))}
    </div>
  );
}
