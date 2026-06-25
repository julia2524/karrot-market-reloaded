"use server";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { postFormSchema } from "./schema";

export async function addPost(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const result = postFormSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (!session.id) {
      redirect("/login");
    }
    const post = await db.post.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: { id: true },
    });
    revalidateTag("initialPosts");
    revalidateTag(`post-${post.id}`);
    revalidateTag(`post-like-${post.id}`);
    revalidateTag(`comments-${post.id}`);
    redirect(`/posts/${post.id}`);
  }
}
