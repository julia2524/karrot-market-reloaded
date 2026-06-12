"use server";
import db from "@/lib/db";
import { createLoginSession } from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

import bcrypt from "bcrypt";

const formSchema = z.object({
  email: z.email("이메일 형식이 아닙니다."),
  password: z.string().min(4, "비밀번호를 입력해주세요."),
});

export default async function login(_prevState: any, formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!user) {
    return {
      fieldErrors: {
        email: ["존재하지 않는 이메일입니다."],
      },
    };
  }

  const ok = await bcrypt.compare(result.data.password, user.password!);
  if (!ok) {
    return {
      fieldErrors: {
        password: ["비밀번호가 일치하지 않습니다."],
      },
    };
  }
  await createLoginSession(user.id);
  return redirect("/profile");
}
