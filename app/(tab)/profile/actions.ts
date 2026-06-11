"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  return user;
}

export const logout = async () => {
  const session = await getSession();
  await session.destroy();
  redirect("/");
};
