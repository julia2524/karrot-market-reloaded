import { addLiveComment, LiveCommentsType } from "@/app/streams/[id]/actions";
import Input from "./input";
import { useFormState } from "react-dom";
import { useRef } from "react";

export type LiveCommentType = LiveCommentsType[number];
interface AddLiveCommentProps {
  streamingId: number;
  userId: number;
  onLiveCommentAdded: (liveComment: LiveCommentType) => void;
  username: string;
  avatar: string;
}

export type LiveCommentState = {
  error: any;
  success: boolean;
} | null;
export default function AddLiveComment({
  streamingId,
  userId,
  onLiveCommentAdded,
  username,
  avatar,
}: AddLiveCommentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const addLiveCommentWithId = async (
    prevState: LiveCommentState,
    formData: FormData
  ) => {
    const payload = formData.get("liveComment") as string;
    if (!payload.trim()) {
      formRef.current?.reset();
      return {
        error: {
          formErrors: ["댓글을 입력해주세요"],
        },
        success: false,
      };
    }
    onLiveCommentAdded({
      id: Date.now(),
      payload,
      created_at: new Date(),
      user: { username, avatar },
    } as LiveCommentType);
    formRef.current?.reset();
    return addLiveComment(streamingId, userId, prevState, formData);
  };
  const [state, action] = useFormState(addLiveCommentWithId, null);
  return (
    <form ref={formRef} action={action} className="">
      <Input
        name="liveComment"
        placeholder="댓글을 남겨주세요"
        errors={state?.error?.formErrors ?? []}
        minLength={1}
        maxLength={200}
        type="text"
      />
    </form>
  );
}
