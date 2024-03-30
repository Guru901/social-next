"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import Link from "next/link";
import { getDateDifference } from "@/functions/getDate";
import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";

const FetchTopicPosts = () => {
  const [user, setUser] = useState();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathName = usePathname();

  const keyWord = pathName.split("/")[2];
  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post/allPosts", {
        keyWord: keyWord,
      });

      setPost(data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    getLoggedInUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <>
        <Nav username={user?.username} avatar={user?.avatar} />
        <div className="flex feedContainer flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
          {post?.map((post) =>
            post.image ? (
              <div
                key={post._id}
                className="card max-w-96 bg-base-100 shadow-xl w-screen singlePost"
              >
                <>
                  <figure>
                    {post.image &&
                    (post.image.endsWith(".mp4") ||
                      post.image.endsWith(".mkv")) ? (
                      <VidPlayer videoUrl={post.image} autoPlay={false} />
                    ) : (
                      post.image.endsWith(".png") ||
                      (post.image.endsWith(".jpg") && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={256}
                          height={128}
                          className="w-full max-h-60 object-cover"
                        />
                      ))
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
                              onClick={() => handleUnLike(post._id)}
                            />
                            <h1>{post?.likes?.length}</h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center cursor-pointer">
                            <AiOutlineLike
                              size={24}
                              onClick={() => handleLike(post._id)}
                            />

                            <h1>{post?.likes?.length}</h1>
                          </div>
                        )}
                        {post?.dislikes?.includes(user?._id) ? (
                          <div className="flex flex-col items-center justify-center cursor-pointer">
                            <AiFillDislike
                              size={24}
                              onClick={() => handleDisUnlike(post._id)}
                            />
                            <h1>{post?.dislikes?.length}</h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center cursor-pointer">
                            <AiOutlineDislike
                              size={24}
                              onClick={() => handleDisLike(post._id)}
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
            ) : (
              <div
                className="card max-w-96 w-[100vw] bg-base-100 shadow-xl singlePost"
                key={post._id}
              >
                <div className="card-body flex flex-col justify-between items-stretch p-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="card-title text-white">
                      Author - {post.username ? post.username : "User"}
                    </h2>
                    <h2 className="card-title">{post.title}</h2>
                    <div className="flex items-end">
                      <p className="max-h-24 overflow-hidden w-[17rem]">
                        {post.body}
                      </p>
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
                                onClick={() => handleUnLike(post._id)}
                              />
                              <h1>{post?.likes?.length}</h1>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <AiOutlineLike
                                size={24}
                                onClick={() => handleLike(post._id)}
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
                              onClick={() => handleDisUnlike(post._id)}
                            />
                            <h1>{post?.dislikes?.length}</h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center cursor-pointer">
                            <AiOutlineDislike
                              size={24}
                              onClick={() => handleDisLike(post._id)}
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
            ),
          )}
        </div>
      </>
    </div>
  );
};

export default FetchTopicPosts;
