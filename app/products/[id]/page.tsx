import { redirect } from "next/navigation";
import {
  deleteProduct,
  getOrCreateChatRoom,
  getProductByCache,
} from "./actions";
import Header from "@/components/header";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { formatToOne } from "@/lib/utils";
import LinkForm from "@/components/link-form";
import Button from "@/components/button";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductByCache(Number(params.id));
  if (!product) return { title: "상품을 찾을 수 없습니다" };
  return { title: product.title };
}

export default async function Product({ params }: { params: { id: string } }) {
  const paramsId = Number(params.id);
  if (isNaN(paramsId)) redirect("/home");
  const product = await getProductByCache(paramsId);
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;
  const deleteProductWithId = deleteProduct.bind(null, product.id);
  const session = await getSession();

  const owner = product.user; //판매자
  const sellerId = owner.id; //판매자..
  const isSeller = session.id === sellerId;

  const chatRoomId = !isSeller
    ? await getOrCreateChatRoom(sellerId, session.id, product.id)
    : null;
  return (
    <div className="flex flex-col h-screen">
      <Header link="/home" icon={ChevronLeftIcon} header="" />
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image src={product?.photo} alt={product.title} fill unoptimized />
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

        <div className="flex flex-col gap-5 px-2 py-5 mx-3 border-t border-neutral-600 mb-24">
          <div className="h-5 text-2xl font-bold">{product.title}</div>
          <div className="h-5 font-bold text-xl">
            {formatToOne(product.price)}원
          </div>
          <div className="font-semibold">{product.description}</div>
        </div>
      </div>

      <footer className="flex flex-row justify-between px-5 py-5  mx-auto w-full max-w-screen-sm font-semibold bg-neutral-800 fixed bottom-0 ">
        {isSeller ? (
          <div className="flex flex-row gap-2 ">
            <LinkForm link={`/products/${params.id}/edit`}>
              <span>게시물 수정</span>
            </LinkForm>
            <form action={deleteProductWithId}>
              <Button text="삭제" />
            </form>
          </div>
        ) : (
          <div />
        )}
        <LinkForm link={isSeller ? "/chat" : `/chats/${chatRoomId}`}>
          <span>{isSeller ? "대화중인 채팅" : "채팅하기"}</span>
        </LinkForm>
      </footer>
    </div>
  );
}
