"use client";
import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import smsLogin from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(smsLogin, initialState);
  return (
    <div className="min-h-screen p-5 ">
      <div className="flex flex-col gap-6">
        <Header link="/login" icon={ChevronLeftIcon} header="휴대폰 인증" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">SMS Login!</h1>
          <h2 className="font-semibold text-lg">
            {!state.token
              ? "휴대폰 번호를 입력해주세요"
              : "인증번호를 입력해 주세요"}
          </h2>
        </div>
        <form action={action} className="flex flex-col gap-3">
          {!state.token ? (
            <Input
              name="phone"
              placeholder="+82 010 0000 0000"
              errors={state?.error?.formErrors ?? []}
              type="text"
              required
            />
          ) : (
            <Input
              name="token"
              placeholder="인증번호 6자리"
              errors={state?.error?.formErrors ?? []}
              min={100000}
              max={999999}
              type="number"
            />
          )}

          <Button text="확인" />
        </form>
      </div>
    </div>
  );
}
