import Header from "@/components/header";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <>
      <Header link="/home" icon={ChevronLeftIcon} header="" />
      <div className="animate-pulse flex flex-col gap-2 ">
        <div className="aspect-square bg-neutral-700"></div>
        <div className="flex flex-row ">
          <div className="p-5">
            <div className="rounded-full size-10 bg-neutral-700"></div>
          </div>
          <div className="flex flex-col pt-5 gap-1">
            <div className="w-40 h-5 rounded-xl bg-neutral-700  "></div>
            <div className="w-32 h-4 rounded-xl bg-neutral-700  "></div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-5">
          <div className="w-72 h-5 rounded-xl bg-neutral-700"></div>
          <div className="w-32 h-4 rounded-xl bg-neutral-700"></div>
        </div>
      </div>
    </>
  );
}
