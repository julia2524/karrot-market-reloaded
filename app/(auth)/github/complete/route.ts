import db from "@/lib/db";
import { createLoginSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAccessToken, getGithubEmail, getGithubProfile } from "./github";

export async function GET(request: NextRequest) {
  //console.log("들어옴!");
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, { status: 400 });
  }

  const token = await getAccessToken(code);
  if (!token) {
    return new Response(null, { status: 400 });
  }
  const githubUser = await getGithubProfile(token);
  if (!githubUser) {
    return new Response(null, { status: 400 });
  }
  const email = await getGithubEmail(token);
  if (!email) {
    return new Response(null, { status: 400 });
  }
  const user = await db.user.findUnique({
    where: {
      github_id: githubUser.id,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await createLoginSession(user.id);
    return redirect("/profile");
  }
  const newUser = await db.user.create({
    data: {
      username: `${githubUser.login}-gh-${githubUser.id
        .toString()
        .slice(0, 3)}`,
      avatar: githubUser.avatar_url,
      github_id: githubUser.id,
      email,
    },
    select: {
      id: true,
    },
  });
  await createLoginSession(newUser.id);
  return redirect("/profile");
}
