"use client";

import { getDateDifference } from "@/functions/getDate";
import {
  handleLike,
  handleDisLike,
  handleDisUnlike,
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

export default function CardWithoutImage({ post, refetch, setLiked }) {
  const { user } = useUserStore();

  return (
    <div className="card max-w-96 w-[100vw] bg-base-100 shadow-xl singlePost">
      <div className="card-body flex flex-col justify-between items-stretch p-4">
        <div className="flex flex-col gap-2">
          <h2 className="card-title text-white">
            Author - {post.username ? post.username : "User"}
          </h2>
          <h2 className="card-title">{post.title}</h2>
          <div className="flex items-end">
            <p className="max-h-24 overflow-hidden w-[17rem]">{post.body}</p>
          </div>
        </div>

        <div className="card-actions justify-between items-center">
          <div className="flex gap-2 text-xl mt-4">
            <button onClick={(prev) => setLiked(!prev)}>
              <div className="flex flex-col items-center justify-center">
                {post?.likes?.includes(user?._id) ? (
                  <div className="flex flex-col items-center justify-center">
                    <AiFillLike
                      size={24}
                      onClick={() => handleUnLike(post._id, user, refetch)}
                    />
                    <h1>{post?.likes?.length}</h1>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <AiOutlineLike
                      size={24}
                      onClick={() => handleLike(post._id, user, refetch)}
                    />

                    <h1>{post?.likes?.length}</h1>
                  </div>
                )}
              </div>
            </button>
            <button>
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

                  <h1>{post?.dislikes?.length}</h1>
                </div>
              )}
            </button>
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
      </div>
    </div>
  );
}
