import db from "@/lib/db";
import { unstable_cache } from "next/cache";

async function getModalProduct(id: number) {
  return await db.product.findUnique({
    where: {
      id,
    },
    select: {
      photo: true,
      title: true,
      price: true,
      id: true,
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

export const getCachedModalProduct = (id: number) =>
  unstable_cache(() => getModalProduct(id), [`modalProduct-${id}`], {
    tags: [`product-${id}`],
  })();
