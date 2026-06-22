"use client";

import { CommentsType } from "@/app/posts/[id]/actions";
import AddComment from "./add-comment";
import Comments from "./comments";
import { useOptimistic } from "react";

interface CommentSectionProps {
  initialComments: CommentsType;
  postId: number;
  userId: number;
  username: string;
  avatar: string;
}

export default function CommentSection({
  initialComments,
  postId,
  userId,
  username,
  avatar,
}: CommentSectionProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (prev, newComment: CommentsType[number]) => [newComment, ...prev]
  );
  return (
    <>
      <AddComment
        postId={postId}
        userId={userId}
        username={username}
        avatar={avatar}
        onCommentAdded={addOptimisticComment}
      />
      <Comments comments={optimisticComments} />
    </>
  );
}
