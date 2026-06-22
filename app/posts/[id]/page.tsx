"use server";
import Header from "@/components/header";
import UserIconBox from "@/components/user-icon";
import { ChevronLeftIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  getCommentsByCache,
  getIsLike,
  getLikeByCache,
  getPostByCache,
} from "./actions";
import { notFound, redirect } from "next/navigation";
import LikeButton from "@/components/like-button";
import { getSession } from "@/lib/session";
import ViewTracker from "@/components/view-tracker";
import CommentSection from "@/components/comment-section";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostByCache(Number(params.id));
  if (!post) return { title: "게시글을 찾을 수 없습니다" };
  return { title: post.title };
}

export default async function Post({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getPostByCache(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const isLike = await getIsLike(session.id!, id);
  const likes = await getLikeByCache(id);

  const initialComments = await getCommentsByCache(id);

  return (
    <div className="">
      <ViewTracker id={id} />
      <Header link="/life" icon={ChevronLeftIcon} header="" />
      <div className="flex flex-col gap-7 p-5">
        <UserIconBox
          photo={post?.user.avatar ?? ""}
          username={post?.user.username}
          created_at={post?.created_at}
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{post.title}</h1>
            <p className="">{post.description}</p>
          </div>
          <div className="flex flex-row  gap-1 *:text-neutral-500">
            <EyeIcon className="size-5" />
            <span className="text-sm font-semibold">조회 {post.views}</span>
          </div>
          <LikeButton
            likeCount={likes ? likes._count.likes : 0}
            postId={id}
            userId={session.id!}
            isLike={isLike}
          />
        </div>

        <div className="flex flex-col gap-5">
          <CommentSection
            username={post?.user.username}
            avatar={post?.user.avatar ?? ""}
            initialComments={initialComments}
            postId={id}
            userId={session.id!}
          />
        </div>
      </div>
    </div>
  );
}
