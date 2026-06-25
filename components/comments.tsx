import { CommentsType } from "@/app/posts/[id]/actions";
import UserIconBox from "./user-icon";

interface CommentsProps {
  comments: CommentsType;
}

export default function Comments({ comments }: CommentsProps) {
  if (!comments) return;
  // console.log(comments);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">댓글 {comments.length}</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-1">
          <UserIconBox
            photo={comment.user.avatar}
            username={comment.user.username}
            created_at={comment.created_at}
          />
          <div className="flex flex-row gap-3">
            <div className="size-10" />
            <div>{comment.payload}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
