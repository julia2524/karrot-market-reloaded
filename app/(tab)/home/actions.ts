"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getProducts() {
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  const products = await db.product.findMany({
    select: {
      id: true,
      photo: true,
      title: true,
      created_at: true,
      price: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 1,
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>;

interface PrevStateProps {
  products: InitialProducts;
  page: number;
}
export async function getMoreProducts(prevState: PrevStateProps) {
  const nextPage = prevState.page + 1;
  const newProducts = await db.product.findMany({
    select: {
      id: true,
      photo: true,
      title: true,
      created_at: true,
      price: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 1,
    skip: nextPage * 1,
  });

  return {
    products: [...prevState.products, ...newProducts],
    page: nextPage,
    isLastPage: newProducts.length === 0,
  };
}
