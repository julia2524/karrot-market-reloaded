import LinkForm from "@/components/link-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen p-5">
      <div className="flex flex-col items-center justify-center gap-5 my-auto">
        <div className="text-9xl">🥕</div>
        <h1 className="text-2xl font-bold">당신 근처의 당근</h1>
        <div className="flex flex-col items-center justify-center font-semibold">
          <div>동네라서 가능한 모든 것</div>
          <div>지금 내 동네를 선택하고 시작해보세요!</div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full  ">
        <LinkForm link="/create-account">
          <span>시작하기</span>
        </LinkForm>
        <div className="flex flex-row gap-1 justify-center text-sm">
          <span className="text-neutral-400">이미 계정이 있나요?</span>
          <Link
            href="/login"
            className="text-orange-500 font-semibold hover:underline underline-offset-2"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
