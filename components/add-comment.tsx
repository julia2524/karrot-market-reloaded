"use client";

import { useFormState } from "react-dom";
import Input from "./input";
import { addComment, CommentsType } from "@/app/posts/[id]/actions";
import { useEffect, useRef } from "react";
import { success } from "zod";

export type CommentType = CommentsType[number];
interface AddCommentProps {
  postId: number;
  userId: number;
  onCommentAdded: (comment: CommentType) => void;
  username: string;
  avatar: string;
}

export type CommentState = {
  error: any;
  success: boolean;
} | null;
export default function AddComment({
  postId,
  userId,
  onCommentAdded,
  username,
  avatar,
}: AddCommentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const addCommentWithId = async (
    prevState: CommentState,
    formData: FormData
  ) => {
    const payload = formData.get("comment") as string;
    if (!payload.trim()) {
      formRef.current?.reset();
      return {
        error: {
          formErrors: ["댓글을 입력해주세요"],
        },
        success: false,
      };
    }
    onCommentAdded({
      id: Date.now(),
      payload,
      created_at: new Date(),
      user: { username, avatar },
    } as CommentType);
    formRef.current?.reset();
    return addComment(postId, userId, prevState, formData);
  };
  const [state, action] = useFormState(addCommentWithId, null);

  // useEffect(() => {
  //   if (state?.success) {
  //     formRef.current?.reset();
  //   }
  // }, [state]);

  return (
    <form ref={formRef} action={action} className="">
      <Input
        name="comment"
        placeholder="댓글을 남겨주세요"
        errors={state?.error?.formErrors ?? []}
        minLength={1}
        maxLength={200}
        type="text"
      />
    </form>
  );
}
