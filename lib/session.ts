import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "karrot-market",
    password: process.env.SESSION_PASSWORD!,
  });
}

export async function createLoginSession(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
