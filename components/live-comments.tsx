import { LiveCommentsType } from "@/app/streams/[id]/actions";
import UserIconBox from "./user-icon";

interface LiveCommentsProps {
  liveComments: LiveCommentsType;
}

export default function LiveComments({ liveComments }: LiveCommentsProps) {
  if (!liveComments) return;
  console.log(liveComments);
  return (
    <div className="flex flex-col gap-4 h-full">
      <h3 className="font-semibold">댓글 {liveComments.length}</h3>
      <div className="flex-1  min-h-0  overflow-y-auto flex flex-col gap-4 pb-10">
        {liveComments.map((comment) => (
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
    </div>
  );
}
