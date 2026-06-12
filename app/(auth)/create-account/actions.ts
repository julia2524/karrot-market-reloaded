"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";
import { createLoginSession, getSession } from "@/lib/session";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "최소 3자 이상 적어주세요."),
    email: z.email("이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(4)
      .regex(
        passwordRegex,
        "대문자, 소문자, 숫자, 특수문자가 모두 포함되어야 합니다."
      ),
    confirm_password: z.string().min(4),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  })
  .superRefine(async (data, ctx) => {
    const [isUsernameAvailable, isEmailAvailable] = await Promise.all([
      checkUsername(data.username),
      checkEmail(data.email),
    ]);
    if (!isUsernameAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 닉네입니다.",
        path: ["username"],
      });
    }
    if (!isEmailAvailable) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
      });
    }
  });

export default async function createAccount(
  _prevState: any,
  formData: FormData
) {
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: { id: true },
    });
    await createLoginSession(user.id);
    redirect("/profile");
  }
}
