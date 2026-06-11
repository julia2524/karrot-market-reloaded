import Link from "next/link";
import { ElementType } from "react";

interface HeaderProps {
  link: string;
  icon: ElementType;
  header: string;
}

export default function Header({ link, icon: Icon, header }: HeaderProps) {
  return (
    <div className="relative flex items-center h-12 z-10">
      <Link href={link} className="absolute left-0 flex">
        <Icon
          className="size-8
          text-neutral-400
          hover:text-white
          transition-colors"
        />
      </Link>
      <span className="w-full text-center  text-xl font-semibold">
        {header}
      </span>
    </div>
  );
}
