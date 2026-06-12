"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getProduct(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = await db.product.findUnique({
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
  return product;
}

export type ProductType = Prisma.PromiseReturnType<typeof getProduct>;

export async function deleteProduct(id: number) {
  const session = await getSession();
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  if (product?.userId !== session.id) {
    return;
  }
  await db.product.delete({
    where: {
      id,
    },
  });
  redirect("/home");
}
