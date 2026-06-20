"use server";

import db from "@/lib/db";
import { deleteProductImage, uploadProductImage } from "@/lib/r2";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { productEditFormSchema } from "./schema";

export default async function editProduct(
  productId: number,
  formData: FormData
) {
  console.log("formData: ", formData);
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };
  console.log("data: ", data);
  const result = await productEditFormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  if (!session.id) {
    redirect("/login");
  }

  let photoUrl;
  const photoFile = result.data.photo;

  if (photoFile instanceof File && photoFile.size > 0) {
    console.log(photoFile);
    photoUrl = await uploadProductImage(photoFile);
  } else if (typeof photoFile === "string") {
    photoUrl = photoFile;
  } else {
    throw new Error("사진은 필수입니다.");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      userId: true,
      photo: true,
    },
  });
  if (!product) {
    return;
  }
  const oldPhoto = product?.photo;
  if (product?.userId !== session.id) {
    return;
  }

  await db.product.update({
    where: {
      id: productId, // 여기에 product.id를 가져와야돼......
    },
    data: {
      photo: photoUrl,
      title: result.data.title,
      description: result.data.description,
      price: result.data.price,
    },
  });
  if (photoUrl !== oldPhoto) {
    //case1) 기존 이미지 삭제..
    await deleteProductImage(oldPhoto);
  }
  //case2)여기서 기존 이미지 삭제하려면.... 또
  revalidateTag(`product-${productId}`);
  revalidateTag("initialProducts");
  redirect(`/products/${productId}`);
}
