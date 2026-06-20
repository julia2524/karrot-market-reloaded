"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ModalXButton() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="relative flex items-center h-12 z-10">
      <button onClick={onClick} className="absolute left-0 flex">
        <XMarkIcon
          className="size-8
          text-neutral-400
          hover:text-white
          transition-colors"
        />
      </button>
    </div>
  );
}
