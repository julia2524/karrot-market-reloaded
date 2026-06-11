"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`p-3 rounded-md font-semibold  transition-all ${
        pending
          ? "bg-neutral-500 hover:bg-neutral-500"
          : "bg-orange-500 hover:bg-orange-400"
      }`}
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
