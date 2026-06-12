"use client";

import Header from "@/components/header";
import Input from "@/components/input";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import addProduct from "./actions";
import Button from "@/components/button";
import { useState } from "react";

export default function AddProduct() {
  const [state, action] = useFormState(addProduct, null);
  const [preview, setPreview] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log();
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 올려주세요!");
      return;
    }
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 2) {
      alert("이미지 파일 크기는 2MB를 넘을 수 없습니다!");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div className="">
      <Header link="/home" icon={XMarkIcon} header="올리기" />
      <form action={action}>
        <label
          className="aspect-square relative border rounded-md m-5 flex flex-col justify-center items-center"
          htmlFor="photo"
          style={{
            backgroundImage: `url(${preview})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          {!preview ? (
            <>
              <CameraIcon className="size-20" />
              <span>사진 첨부</span>
            </>
          ) : null}
        </label>
        <input
          onChange={onChange}
          id="photo"
          name="photo"
          type="file"
          className="hidden"
          accept="image/*"
        />

        <div className="flex flex-col gap-3 p-5 ">
          <Input
            name="title"
            placeholder="제목을 입력해주세요."
            errors={state?.fieldErrors.title ?? []}
            type="text"
            required
          />
          <Input
            name="description"
            placeholder="구매 시기, 사용감(흠집, 파손 여부) 등 설명을 최대한 자세히 적어주세요. "
            errors={state?.fieldErrors.description ?? []}
            type="text"
            required
          />
          <Input
            name="price"
            placeholder="가격을 입력해주세요."
            errors={state?.fieldErrors.price ?? []}
            type="text"
            required
          />

          <Button text="작성 완료" />
        </div>
      </form>
    </div>
  );
}
