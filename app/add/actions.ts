"use server";

import db from "@/lib/db";
import { uploadProductImage } from "@/lib/r2";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { productFormSchema } from "./schema";
import { revalidateTag } from "next/cache";

export default async function addProduct(formData: FormData) {
  //  console.log("formData: ", formData);
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };
  //console.log("data: ", data);
  const result = await productFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const photoFile = result.data.photo;
    const photoUrl = await uploadProductImage(photoFile);

    const session = await getSession();
    if (!session.id) {
      redirect("/login");
    }
    const product = await db.product.create({
      data: {
        photo: photoUrl,
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    revalidateTag("initialProducts");
    redirect(`/products/${product.id}`);
  }
}
