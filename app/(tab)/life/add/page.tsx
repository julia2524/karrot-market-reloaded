"use client";

import Button from "@/components/button";
import Header from "@/components/header";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addPost } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { postFormSchema, PostFormType } from "./schema";

export default function AddPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postFormSchema),
  });
  const onValid = handleSubmit(async (data: PostFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    await addPost(formData);
  });
  return (
    <div className="flex flex-col h-screen p-5 gap-5">
      <Header link="/life" icon={XMarkIcon} header="올리기" />
      <form onSubmit={onValid} className="flex flex-col gap-3">
        <Input
          {...register("title")}
          placeholder="제목을 입력해주세요."
          errors={errors.title?.message ? [errors.title.message] : []}
          type="text"
          required
        />
        <Input
          {...register("description")}
          placeholder="이웃과 이야기를 나눠보세요. "
          errors={
            errors.description?.message ? [errors.description.message] : []
          }
          type="text"
          required
        />

        <Button text="완료" />
      </form>
    </div>
  );
}
