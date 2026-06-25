"use server";

import z from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";
import { createLoginSession } from "@/lib/session";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "전화번호를 다시 써 주세요."
  );
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999, "인증번호는 6자리입니다.");

interface PrevState {
  token: boolean;
}

async function getToken() {
  const newToken = crypto.randomInt(100000, 999999);
  const existToken = await db.sMStoken.findFirst({
    where: {
      token: newToken,
    },
  });
  if (existToken) {
    return getToken();
  } else {
    return newToken;
  }
}
export default async function smsLogin(
  prevState: PrevState,
  formData: FormData
) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const phoneResult = await phoneSchema.safeParseAsync(phone);
    if (!phoneResult.success) {
      return { token: false, error: phoneResult?.error?.flatten() };
    } else {
      await db.sMStoken.deleteMany({
        where: {
          user: {
            phone: phoneResult.data,
          },
        },
      });
      const newToken = await getToken();
      // console.log(newToken);
      const user = await db.sMStoken.create({
        data: {
          token: newToken,
          user: {
            connectOrCreate: {
              where: {
                phone: phoneResult.data,
              },
              create: {
                username: crypto.randomBytes(8).toString("hex"),
                phone: phoneResult.data,
              },
            },
          },
        },
        select: {
          user: true,
        },
      });
      //   console.log(user);
      return { token: true };
    }
  } else {
    const tokenResult = await tokenSchema.safeParseAsync(token);
    const phoneResult = await phoneSchema.safeParseAsync(phone);
    if (!phoneResult.success) {
      return { token: false, error: phoneResult?.error?.flatten() };
    }
    if (!tokenResult.success) {
      return { token: true, error: tokenResult.error.flatten() };
    } else {
      //token 인증시..phone값도 확인
      //즉, token을 조회시.. phone값을 추가
      const token = await db.sMStoken.findFirst({
        where: {
          token: tokenResult.data,
          user: {
            phone: phoneResult.data,
          },
        },
        select: {
          userId: true,
          id: true,
        },
      });
      if (!token) {
        return {
          token: true,
          error: { formErrors: ["인증번호를 확인해주세요."], fieldErrors: {} },
        };
      }
      await createLoginSession(token.userId);
      await db.sMStoken.delete({
        where: {
          id: token.id,
        },
      });
      redirect("/profile");
    }
  }
}
