"use client";

import Image from "next/image";
import { getDateDifference } from "@/functions/getDate";
import {
  handleDisLike,
  handleDisUnlike,
  handleLike,
  handleUnLike,
} from "@/functions/likeUtils";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export default function CardWithMedia({ post, refetch }) {
  const { user } = useUserStore();

  return (
    <div className="card max-w-96 bg-base-100 shadow-xl w-screen singlePost">
      <>
        <figure>
          {post.image &&
          (post.image.endsWith(".mp4") || post.image.endsWith(".mkv")) ? (
            <VidPlayer videoUrl={post.image} autoPlay={false} />
          ) : (
            <Image
              src={post.image}
              alt={post.title}
              width={256}
              height={128}
              className="w-full max-h-60 object-cover"
            />
          )}
        </figure>
        <div className="card-body gap-1 p-4 flex-row justify-between">
          <div className="w-[14rem]">
            <h2 className="card-title text-white font-bold">
              Author - {post.username ? post.username : "User"}
            </h2>
            <h2 className="card-title">{post.title}</h2>
            <p className="max-h-24 overflow-hidden">{post.body}</p>
            <div className="flex gap-2 text-xl mt-4">
              {post?.likes?.includes(user?._id) ? (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  <AiFillLike
                    size={24}
                    onClick={() => handleUnLike(post._id, user, refetch)}
                  />
                  <h1>{post?.likes?.length}</h1>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  <AiOutlineLike
                    size={24}
                    onClick={() => handleLike(post._id, user, refetch)}
                  />

                  <h1>{post?.likes?.length}</h1>
                </div>
              )}
              {post?.dislikes?.includes(user?._id) ? (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  <AiFillDislike
                    size={24}
                    onClick={() => handleDisUnlike(post._id, user, refetch)}
                  />
                  <h1>{post?.dislikes?.length}</h1>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center cursor-pointer">
                  <AiOutlineDislike
                    size={24}
                    onClick={() => handleDisLike(post._id, user, refetch)}
                  />
                  <h1>{post.dislikes?.length}</h1>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Link href={`/post/${post._id}`}>
              <button className="btn btn-neutral">See more</button>
            </Link>
            <div>
              <h1 className="text-sm font-bold">
                {getDateDifference(post?.createdAt)?.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
