"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { liveFormSchema } from "./schema";

export async function addLive(formData: FormData) {
  const data = {
    title: formData.get("title"),
  };
  const result = liveFormSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  console.log(process.env.CLOUDFLARE_API_TOKEN);
  console.log("ACCOUNT_ID:", process.env.CLOUDFLARE_ACCOUNT_ID);
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meta: {
          name: result.data.title,
        },
        recording: {
          mode: "automatic",
        },
      }),
    }
  );
  const json = await response.json();
  console.log(json);
  if (!json.success) {
    console.log(json.errors);
    return;
  }

  const session = await getSession();
  if (!session.id) {
    redirect("login");
  }
  const live = await db.streaming.create({
    data: {
      title: result.data.title,
      stream_id: json.result.uid,
      stream_key: json.result.rtmps.streamKey,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
    select: { id: true },
  });
  revalidateTag("initialLives");
  // revalidateTag(`live-${live.id}`);
  redirect(`/streams/${live.id}`);
}
