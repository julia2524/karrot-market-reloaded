"use server";
import db from "@/lib/db";
import { deleteProductImage } from "@/lib/r2";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function getProduct(id: number) {
  return await db.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      photo: true,
      title: true,
      created_at: true,
      price: true,
      description: true,
      user: {
        select: {
          avatar: true,
          username: true,
          id: true,
        },
      },
    },
  });
}

const getCachedProduct = (id: number) =>
  unstable_cache(() => getProduct(id), [`product-${id}`], {
    tags: [`product-${id}`],
  })();

export async function getProductByCache(id: number) {
  return await getCachedProduct(id);
}

export type ProductType = Prisma.PromiseReturnType<typeof getProductByCache>;

export async function deleteProduct(id: number) {
  const session = await getSession();
  if (!session.id) {
    redirect("/login");
  } // 이것도 넣어야되나..?? 뭔가 어디까지 보안을 해야될 지도 고민이야..
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      photo: true,
    },
  });
  if (!product) {
    return;
  }
  if (product?.userId !== session.id) {
    return;
  }
  //먼저 r2삭제

  await deleteProductImage(product.photo);
  await db.product.delete({
    where: {
      id,
    },
  });

  revalidateTag("initialProducts");
  revalidateTag(`product-${id}`);
  redirect("/home");
}
