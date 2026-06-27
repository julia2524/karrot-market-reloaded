"use client";

import Header from "@/components/header";
import Input from "@/components/input";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addLive } from "./actions";
import Button from "@/components/button";
import { liveFormSchema, LiveFormType } from "./schema";

export default function AddLive() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(liveFormSchema),
  });
  const onValid = handleSubmit(async (data: LiveFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    await addLive(formData);
  });
  return (
    <div className="flex flex-col gap-5 p-5">
      <Header link="/live" icon={XMarkIcon} header="라이브 작성" />
      <form onSubmit={onValid} className="flex flex-col gap-3">
        <Input
          {...register("title")}
          placeholder="제목을 입력해주세요."
          errors={errors.title?.message ? [errors.title.message] : []}
          type="text"
          required
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
