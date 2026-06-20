import TabHeader from "@/components/tab-header";

export default function Loading() {
  return (
    <div>
      <TabHeader header="동네생활" />
      {[...Array(10)].map((_, index) => (
        <div key={index} className="animate-pulse ">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-2">
              <div className="w-40 h-6 rounded-xl bg-neutral-700"></div>
              <div className="w-48 h-5 rounded-xl bg-neutral-700"></div>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex gap-2">
                <div className="w-10 h-5 rounded-xl bg-neutral-700" />
                <div className="w-10 h-5 rounded-xl bg-neutral-700" />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-5 rounded-xl bg-neutral-700" />
                  <div className="w-7 h-5 rounded-xl bg-neutral-700" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b m-3 border-neutral-600" />
        </div>
      ))}
    </div>
  );
}
