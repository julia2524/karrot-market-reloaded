import ModalXButton from "@/components/modal-x-button";
import { formatToOne } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getCachedModalProduct } from "./actions";
import ProductModalLink from "@/components/product-modal-link";

export default async function interceptingProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await getCachedModalProduct(Number(params.id));
  if (!product) return;
  // console.log(product);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
      <div className="w-full rounded-lg overflow-hidden shadow-2xl max-w-screen-sm">
        <ModalXButton />
        <ProductModalLink>
          <div className="flex flex-col gap-2 ">
            <div className="aspect-square relative ">
              <Image
                src={product?.photo}
                alt={product.title}
                fill
                unoptimized
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="px-5 py-2">
              <div className="rounded-full size-10 bg-neutral-500 flex items-center justify-center relative overflow-hidden">
                {product?.user?.avatar ? (
                  <Image
                    src={product?.user?.avatar}
                    alt={product.user.username}
                    fill
                    unoptimized
                  />
                ) : (
                  <UserIcon className="size-8" />
                )}
              </div>
            </div>
            <div className="flex flex-col pt-3 ">
              <div className="w-40 h-5 font-semibold uppercase">
                {product.user.username}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 px-2 py-5 mx-3 border-t border-neutral-600 ">
            <div className="h-5 text-2xl font-bold">{product.title}</div>
            <div className="h-5 font-bold text-xl">
              {formatToOne(product.price)}원
            </div>
            <div className="font-semibold"></div>
          </div>
        </ProductModalLink>
      </div>
    </div>
  );
}
