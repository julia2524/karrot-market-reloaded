"use client";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import createAccount from "./actions";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="min-h-screen p-5 ">
      <div className="flex flex-col gap-6">
        <Header link="/" icon={XMarkIcon} header="회원가입" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">안녕하세요!</h1>
          <h2 className="font-semibold text-lg">
            Fill in the form below to join!
          </h2>
        </div>
        <form action={action} className="flex flex-col gap-3">
          <Input
            name="username"
            placeholder="닉네임"
            errors={state?.fieldErrors.username ?? []}
            type="text"
            required
          />
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
          <Input
            name="confirm_password"
            placeholder="비밀번호 확인"
            errors={state?.fieldErrors.confirm_password ?? []}
            type="password"
            required
          />
          <Button text="Create account" />
        </form>
        <SocialLogin />
      </div>
    </div>
  );
}
