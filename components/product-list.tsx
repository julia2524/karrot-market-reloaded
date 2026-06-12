"use client";
import { getMoreProducts, InitialProducts } from "@/app/(tab)/home/actions";
import { formatToAgo, formatToOne } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [state, action] = useFormState(getMoreProducts, {
    products: initialProducts,
    page: 0,
    isLastPage: false,
  });
  const trigger = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entries[0].isIntersecting && !state.isLastPage) {
          action();
        }
      }
    );
    if (trigger.current) observer.observe(trigger.current);
    return () => observer.disconnect();
  }, [state.isLastPage, action]);
  return (
    <>
      {state.products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id} className="">
          <div className="flex flex-row gap-5 p-5">
            <div className="size-28 rounded-xl overflow-hidden bg-neutral-700 relative">
              <Image
                src={product.photo}
                alt={product.title}
                fill
                unoptimized
                className="object-cover bg-neutral-700"
              />
            </div>

            <div className="flex flex-col m-2">
              <div className="text-lg text-white">{product.title}</div>
              <div className="text-sm text-neutral-400">
                {formatToAgo(product.created_at.toString())}
              </div>
              <div className="font-semibold text-lg text-white">
                {formatToOne(product.price)}원
              </div>
            </div>
          </div>
          <div className="border-b m-3 border-neutral-600" />
        </Link>
      ))}

      <form action={action} className="mb-28 items-center flex justify-center ">
        <div ref={trigger}>
          {state.isLastPage ? (
            <div className="p-5">더 이상 상품이 없습니다.</div>
          ) : (
            <div className="h-10 w-96 rounded-full bg-neutral-800" />
          )}
        </div>
      </form>
    </>
  );
}
