"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

async function getInitProducts() {
  return await db.product.findMany({
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
    take: 4,
  });
}

const getCachedInitProducts = unstable_cache(
  getInitProducts,
  ["initialProducts"],
  { tags: ["initialProducts"], revalidate: 60 }
);

export async function getProducts() {
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  return await getCachedInitProducts();
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
    take: 4,
    skip: nextPage * 4,
  });

  return {
    products: [...prevState.products, ...newProducts],
    page: nextPage,
    isLastPage: newProducts.length === 0,
  };
}
