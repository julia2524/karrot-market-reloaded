import { formatToOne } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProductStateProps {
  photo: string;
  title: string;
  price: number;
  productId: number;
}

export default function ProductState({
  photo,
  title,
  price,
  productId,
}: ProductStateProps) {
  return (
    <Link href={`/products/${productId}`} key={title}>
      <div className="flex flex-row gap-4 p-5 items-center">
        <div className="size-14 rounded-xl  overflow-hidden bg-neutral-700 relative">
          <Image
            src={photo}
            alt={title}
            fill
            unoptimized
            className="object-cover bg-neutral-700"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <span className="font-semibold text-white">판매중</span>
            <span className=" text-white">{title}</span>
          </div>
          <div className="font-semibold text-white">{formatToOne(price)}</div>
        </div>
      </div>
    </Link>
  );
}
