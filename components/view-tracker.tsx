"use client";

import { incrementPostViews } from "@/app/posts/[id]/actions";
import { useEffect } from "react";

export default function ViewTracker({ id }: { id: number }) {
  useEffect(() => {
    const isViewed = sessionStorage.getItem(`view-${id}`);
    if (!isViewed) {
      incrementPostViews(id);
      sessionStorage.setItem(`view-${id}`, "true");
    }
  }, [id]);
  return null;
}
