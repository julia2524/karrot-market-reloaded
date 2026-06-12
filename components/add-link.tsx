import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface AddLinkProps {
  link: string;
}

export default function AddLink({ link }: AddLinkProps) {
  console.log(link);
  return (
    <Link href={link} className="">
      <PlusIcon className="size-16 p-3 font-bold hover:bg-orange-400 bg-orange-500 text-center  rounded-full flex items-center justify-center" />
    </Link>
  );
}
