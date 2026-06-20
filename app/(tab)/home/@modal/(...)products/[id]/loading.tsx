import ModalXButton from "@/components/modal-x-button";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center p-5 z-50">
      <div className="w-full rounded-lg overflow-hidden shadow-2xl max-w-screen-sm ">
        <ModalXButton />
        <div className="animate-pulse">
          <div className="flex flex-col gap-2 ">
            <div className="aspect-square relative bg-neutral-700"></div>
          </div>
          <div className="flex flex-row">
            <div className="px-5 py-2">
              <div className="rounded-full size-10 bg-neutral-700 flex items-center justify-center relative overflow-hidden"></div>
            </div>
            <div className="flex flex-col pt-4 ">
              <div className="w-24 h-5 font-semibold uppercase bg-neutral-700 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-2 py-5 mx-3 border-t border-neutral-600  ">
            <div className="h-5 w-48 text-2xl font-bold bg-neutral-700  rounded-full"></div>
            <div className="h-5 w-72 font-bold text-xl bg-neutral-700  rounded-full"></div>
            <div className="h-5 w-72 font-bold text-xl bg-neutral-700  rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
