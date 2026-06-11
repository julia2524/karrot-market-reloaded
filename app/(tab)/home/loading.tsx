import TabHeader from "@/components/tab-header";

export default function Loading() {
  return (
    <div>
      <TabHeader header="홈" />
      {[...Array(10)].map((_, index) => (
        <div key={index} className="animate-pulse ">
          <div className="flex flex-row gap-5 p-5">
            <div className="size-28 rounded-xl bg-neutral-700"></div>
            <div className="flex flex-col gap-2 m-2">
              <div className="w-40 h-5 rounded-xl bg-neutral-700"></div>
              <div className="w-28 h-2 rounded-xl bg-neutral-700"> </div>
              <div className="w-32 h-4 rounded-xl bg-neutral-700"></div>
            </div>
          </div>
          <div className="border-b m-3 border-neutral-600" />
        </div>
      ))}
    </div>
  );
}
