"use server";

import db from "@/lib/db";
import { S3 } from "@/lib/r2";
import { getSession } from "@/lib/session";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";
import z from "zod";

const formSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, "사진첨부는 필수입니다."),
  title: z.string().min(3, "최소 3자 이상 적어주세요."),
  description: z.string().min(10, "최소 10자 이상 적어주세요."),
  price: z.coerce.number("숫자를 입력해주세요."),
});

export default async function addProduct(_prevState: any, formData: FormData) {
  console.log("formData: ", formData);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };
  console.log("data: ", data);
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const photoFile = result.data.photo;
    const buffer = Buffer.from(await photoFile.arrayBuffer());
    const fileName = `products/${Date.now()}-${photoFile.name}`;

    await S3.send(
      new PutObjectCommand({
        Bucket: "karrot-market-reloaded", // 버킷 이름
        Key: fileName,
        Body: buffer,
        ContentType: photoFile.type,
      })
    );
    const photoUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

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
    redirect(`/products/${product.id}`);
  }
}
