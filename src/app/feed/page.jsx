"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import Link from "next/link";
import VidPlayer from "@/Components/VidPlayer";
import Spinner from "@/Components/Spinner";
import Nav from "@/Components/Nav";
import Image from "next/image";
import "./feed.css";
import { getDateDifference } from "@/functions/getDate";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [byLiked, setByLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/post/allPosts", {
        isPublic: true,
      });
      setPosts(data.reverse());

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put("/api/likes/like", {
        id: id,
        user: user._id,
      });
      fetchPostForLikes();
    } catch (error) {
      console.log(error);
      setError("An error occurred. Try logging in again.");
    }
  };

  const handleUnLike = async (id) => {
    try {
      await axios.put("/api/likes/unlike", {
        id: id,
        user: user._id,
      });
      fetchPostForLikes();
    } catch (error) {
      console.log(error);
      setError("An error occurred. Try logging in again.");
    }
  };

  const handleDisLike = async (id) => {
    try {
      await axios.put("/api/likes/dislike", {
        id: id,
        user: user._id,
      });

      fetchPostForLikes();
    } catch (error) {
      console.log(error);
      setError("An error occurred. Try logging in again.");
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      if (!data.username) {
        getUser();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDisUnlike = async (id) => {
    try {
      await axios.put("/api/likes/disunlike", {
        id: id,
        user: user._id,
      });
      fetchPostForLikes();
    } catch (error) {
      console.log(error);
      setError("An error occurred. Try logging in again.");
    }
  };

  const fetchPostForLikes = async () => {
    try {
      const { data } = await axios.post("/api/post/allPosts", {
        isPublic: true,
      });
      setPosts(data.reverse());
    } catch (error) {
      console.log(error);
      setError("An error occurred. Try logging in again.");
    }
  };

  const sortedPosts = byLiked
    ? [...posts].sort((a, b) => b.likes.length - a.likes.length)
    : posts;

  useEffect(() => {
    if (byLiked) {
      setPosts((currentPosts) =>
        [...currentPosts].sort((a, b) => b.likes.length - a.likes.length)
      );
    } else {
      fetchPostForLikes();
    }
  }, [byLiked]);

  useEffect(() => {
    getUser();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (user?.username === undefined) {
      getUser();
    }
  }, [user]);

  if (error) {
    return <div>An error occurred</div>;
  }

  if (loading) return <Spinner />;

  return (
    <>
      <div className="flex justify-center">
        <Nav username={user?.username} />
      </div>
      <div className="mt-2 flex w-screen max-w-96 justify-end items-center">
        <select
          className="select select-bordered max-w-xs"
          onChange={(e) => setByLiked(e.target.value === "true")}
        >
          <option value={false}>Most Recent</option>
          <option value={true}>Most liked</option>
        </select>
      </div>
      <div className="flex feedContainer flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
        {sortedPosts.map((post) =>
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
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={256}
                      height={128}
                      className="w-full max-h-60 object-cover"
                    />
                  )}
                </figure>{" "}
                <div className="card-body gap-1 p-4 flex-row justify-between">
                  <div className="w-[14rem]">
                    <h2 className="card-title text-white font-bold">
                      Author - {post.username ? post.username : "User"}
                    </h2>
                    <h2 className="card-title">{post.title}</h2>
                    <p className="max-h-24 overflow-hidden">{post.body}</p>
                    <div className="flex gap-2 text-xl mt-4">
                      {post.likes.includes(user?._id) ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <AiFillLike
                            size={24}
                            onClick={() => handleUnLike(post._id)}
                          />
                          <h1>{post.likes.length}</h1>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <AiOutlineLike
                            size={24}
                            onClick={() => handleLike(post._id)}
                          />

                          <h1>{post.likes.length}</h1>
                        </div>
                      )}
                      {post.dislikes.includes(user?._id) ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <AiFillDislike
                            size={24}
                            onClick={() => handleDisUnlike(post._id)}
                          />
                          <h1>{post.dislikes?.length}</h1>
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
                        {post.likes.includes(user?._id) ? (
                          <div className="flex flex-col items-center justify-center">
                            <AiFillLike
                              size={24}
                              onClick={() => handleUnLike(post._id)}
                            />
                            <h1>{post.likes.length}</h1>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <AiOutlineLike
                              size={24}
                              onClick={() => handleLike(post._id)}
                            />

                            <h1>{post.likes.length}</h1>
                          </div>
                        )}
                      </div>
                    </button>
                    <button>
                      {post.dislikes.includes(user?._id) ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <AiFillDislike
                            size={24}
                            onClick={() => handleDisUnlike(post._id)}
                          />
                          <h1>{post.dislikes?.length}</h1>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <AiOutlineDislike
                            size={24}
                            onClick={() => handleDisLike(post._id)}
                          />

                          <h1>{post.dislikes.length}</h1>
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
          )
        )}
      </div>
    </>
  );
};

export default Feed;
