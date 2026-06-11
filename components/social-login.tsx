import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import GithubIcon from "./icons/GithubIcon";
import LinkForm from "./link-form";

export default function SocialLogin() {
  return (
    <>
      <div className=" w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <LinkForm link="/github/start">
          <GithubIcon />
          <span>Continue with Github</span>
        </LinkForm>
        <LinkForm link="/sms">
          <ChatBubbleOvalLeftEllipsisIcon className="size-7" />
          <span>Continue with SMS</span>
        </LinkForm>
      </div>
    </>
  );
}
