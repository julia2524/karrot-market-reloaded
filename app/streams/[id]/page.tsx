import Header from "@/components/header";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { notFound, redirect } from "next/navigation";
import {
  deleteStreaming,
  getLiveComments,
  getLoginUser,
  getStream,
} from "./actions";
import { getSession } from "@/lib/session";
import UserIconBox from "@/components/user-icon";
import Button from "@/components/button";
import LiveCommentSection from "@/components/live-comment-section";

export default async function Streaming({
  params,
}: {
  params: { id: string };
}) {
  const streamingId = Number(params.id);
  if (isNaN(streamingId)) redirect("/live");
  const streaming = await getStream(streamingId);
  if (!streaming) {
    return notFound();
  }
  const deleteStreamingWithId = deleteStreaming.bind(null, streamingId);
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const me = await getLoginUser(session.id!);
  if (!me) {
    redirect("login");
  }
  const initialLiveComments = await getLiveComments(streamingId);
  return (
    <div className="flex flex-col gap-3 p-5 h-screen overflow-hidden">
      <Header link="/live" icon={ChevronLeftIcon} header={streaming.title} />

      <div className="relative aspect-video">
        <iframe
          src={`https://customer-rp1qj2phs0pv7ezg.cloudflarestream.com/${streaming.stream_id}/iframe`}
          className="border-none absolute top-0 left-0 h-full w-full rounded-md"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <UserIconBox
          photo={streaming.user.avatar}
          username={streaming.user.username}
          created_at={streaming.created_at}
        />
      </div>
      <div className="border-b m-3 border-neutral-600" />
      {session.id === streaming.user.id ? (
        <div className="  flex flex-col gap-2 ">
          <div className="flex flex-col  bg-yellow-300  p-3 rounded-md *:text-black">
            <span className="font-semibold">WebRTC(WHIP) URL:</span>
            <span className="text-wrap">
              https://customer-rp1qj2phs0pv7ezg.cloudflarestream.com/469f0898cba315cea6ffe3005a261cd8k7c51841f48e5d105177c5ffe55e910b5/webRTC/publish
            </span>
          </div>
          <form action={deleteStreamingWithId} className="flex flex-col">
            <Button text="삭제" />
          </form>
        </div>
      ) : null}
      <div className="flex flex-col gap-5 flex-1 min-h-0">
        <LiveCommentSection
          username={me.username}
          avatar={me.avatar ?? ""}
          initialLiveComments={initialLiveComments}
          streamingId={streamingId}
          userId={session.id!}
        />
      </div>
    </div>
  );
}
