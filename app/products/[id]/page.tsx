import { redirect } from "next/navigation";
import { getProduct, ProductType } from "./actions";
import Header from "@/components/header";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const paramsId = Number(params.id);
  if (isNaN(paramsId)) redirect("/home");
  const product = await getProduct(paramsId);
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;
  return (
    <>
      <Header link="/home" icon={ChevronLeftIcon} header="" />
      <div className="flex flex-col gap-2 ">
        <div className="aspect-square relative ">
          <Image src={product?.photo} alt={product.title} fill unoptimized />
        </div>
        <div className="flex flex-row border-b border-neutral-600 mx-3 gap-2">
          <div className="px-2 py-5">
            <div className="rounded-full size-10 bg-neutral-500 flex items-center justify-center">
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
          <div className="flex flex-col pt-6 ">
            <div className="w-40 h-5 font-semibold uppercase">
              {product.user.username}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-5 py-3">
          <div className="w-72 h-5 text-2xl font-bold">{product.title}</div>
          <div className="w-32 h-4 ">{product.description}</div>
        </div>
      </div>
    </>
  );
}
