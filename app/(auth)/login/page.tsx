"use client";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import login from "./actions";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <div className="min-h-screen p-5 ">
      <div className="flex flex-col gap-6">
        <Header link="/" icon={ChevronLeftIcon} header="로그인" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">안녕하세요!</h1>
          <h2 className="font-semibold text-lg">
            Log in with email and password
          </h2>
        </div>
        <form action={action} className="flex flex-col gap-3">
          <Input
            name="email"
            placeholder="이메일"
            errors={state?.fieldErrors.email ?? []}
            type="email"
            required
          />
          <Input
            name="password"
            placeholder="비밀번호"
            errors={state?.fieldErrors.password ?? []}
            type="password"
            required
          />
          <Button text="Login" />
        </form>
        <SocialLogin />
      </div>
    </div>
  );
}
