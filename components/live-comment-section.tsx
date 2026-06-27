"use client";

import { LiveCommentsType } from "@/app/streams/[id]/actions";
import { useOptimistic } from "react";
import LiveComments from "./live-comments";
import AddLiveComment from "./add-live-comment";

interface LiveCommentSectionProps {
  initialLiveComments: LiveCommentsType;
  streamingId: number;
  userId: number;
  username: string;
  avatar: string;
}

export default function LiveCommentSection({
  initialLiveComments,
  streamingId,
  userId,
  username,
  avatar,
}: LiveCommentSectionProps) {
  const [optimisticLiveComments, addOptimisticLiveComment] = useOptimistic(
    initialLiveComments,
    (prev, newComment: LiveCommentsType[number]) => [newComment, ...prev]
  );
  return (
    <>
      <AddLiveComment
        streamingId={streamingId}
        userId={userId}
        username={username}
        avatar={avatar}
        onLiveCommentAdded={addOptimisticLiveComment}
      />
      <LiveComments liveComments={optimisticLiveComments} />
    </>
  );
}
