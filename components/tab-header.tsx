import Link from "next/link";
import { ElementType } from "react";

interface HeaderProps {
  header: string;
}

export default function TabHeader({ header }: HeaderProps) {
  return (
    <div className="">
      <div className="flex items-center p-5 pt-8 bg-neutral-900 fixed top-0 w-full z-10 ">
        <span className="w-full text-2xl font-semibold">{header}</span>
      </div>
      <div className="h-20" />
    </div>
  );
}
