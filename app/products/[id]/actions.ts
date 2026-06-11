import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
        },
      },
    },
  });
  return product;
}

export type ProductType = Prisma.PromiseReturnType<typeof getProduct>;
