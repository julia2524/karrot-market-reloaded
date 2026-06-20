import Header from "@/components/header";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="flex flex-col gap-7">
      <Header link="/life" icon={ChevronLeftIcon} header="" />
      <div className="animate-pulse flex flex-col gap-8 ">
        <div className="flex flex-row gap-3">
          <div className="relative size-10 flex items-center justify-center  ">
            <div className=" bg-neutral-700 rounded-full size-9" />
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <div className="text-sm bg-neutral-700 w-14 h-3 rounded-full"></div>
            <div className="text-sm bg-neutral-700 w-20 h-3 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <h1 className=" bg-neutral-700 w-44 h-8 rounded-full"></h1>
            <p className="flex flex-col gap-1">
              <p className=" bg-neutral-700 w-80 h-5 rounded-full"></p>
              <p className=" bg-neutral-700 w-64 h-5 rounded-full"></p>
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-neutral-700 w-32 h-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
