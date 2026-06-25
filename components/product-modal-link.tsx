"use client";
import { useRouter } from "next/navigation";

interface ProductModalLinkProps {
  children: React.ReactNode;
}

export default function ProductModalLink({ children }: ProductModalLinkProps) {
  const onClick = () => {
    // console.log("Click");
    window.location.reload();
  };
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
