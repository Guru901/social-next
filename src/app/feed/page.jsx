"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Link from "next/link";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState();

  const fetchPosts = async () => {
    try {
      // fetching posts from backend
      // setting loading to true so that user knows the request is sent
      setLoading(true);

      const { data } = await axios.post("/api/post/allPosts", {
        isPublic: true,
      });
      setPosts(data.reverse());
      // loading set to false so that the content can render
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const getUser = async () => {
    const { data } = await axios.post("/api/user/me");
    setUser(data);
  };

  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  if (error) {
    return <div>An error occurred</div>;
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="navbar max-w-[27rem] w-screen flex justify-between px-2 items-center">
          <h1 className="text-xl">User - {user?.username}</h1>
          <button className="btn btn-neutral" onClick={fetchPosts}>
            Reload
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
        {posts.map((post) =>
          post.image ? ( // checking if the post has image to show different styles based on image
            <div
              key={post._id}
              className="card max-w-96 bg-base-100 shadow-xl w-screen"
            >
              <>
                <figure>
                  {post.image &&
                  (post.image.endsWith(".mp4") ||
                    post.image.endsWith(".mkv")) ? (
                    <video controls className="max-h-64 w-full object-cover">
                      <source src={post.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    // Otherwise, assume it's an image
                    <img
                      src={post.image}
                      alt={post.title}
                      className="max-h-64 w-full object-cover"
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
                    <div className="flex gap-2 text-xl">
                      {liked ? (
                        <AiFillLike size={24} />
                      ) : (
                        <AiOutlineLike size={24} />
                      )}
                      <AiOutlineDislike />
                    </div>
                  </div>
                  <Link href={`/post/${post._id}`}>
                    <button className="btn btn-neutral">See more</button>
                  </Link>
                </div>
              </>
            </div>
          ) : (
            <div
              className="card max-w-96 w-[100vw] bg-base-100 shadow-xl"
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
                    <p>....</p>
                  </div>
                </div>

                <div className="card-actions justify-between items-center">
                  <div className="flex gap-2">
                    <button onClick={(prev) => setLiked(!prev)}>
                      {liked ? (
                        <>
                          <AiFillLike size={24} />
                          <h1 className="text-xs">12</h1>
                        </>
                      ) : (
                        <>
                          <AiOutlineLike size={24} />
                          <h1 className="text-xs">12</h1>
                        </>
                      )}
                    </button>
                    <button>
                      <AiOutlineDislike size={24} />
                      <h1 className="text-xs">12</h1>
                    </button>
                  </div>
                  <Link href={`/post/${post._id}`}>
                    <button className="btn btn-neutral">See more</button>
                  </Link>
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
