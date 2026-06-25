import { formatToDate } from "@/lib/utils";

interface MessageDateProps {
  prevMsg?: {
    created_at: Date;
  };
  nowMsgTime: Date;
}
export default function MessageDate({ prevMsg, nowMsgTime }: MessageDateProps) {
  console.log("prevMsg: ", prevMsg);
  console.log("nowMsgTime: ", nowMsgTime);

  const prevDate = prevMsg ? formatToDate(new Date(prevMsg.created_at)) : null;
  const nowDate = formatToDate(new Date(nowMsgTime));
  if (prevDate === nowDate) return null;
  return (
    <div className="flex justify-center items-center text-sm text-neutral-400">
      {nowDate}
    </div>
  );
}
