"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillExclamationCircle,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import Link from "next/link";

const Feed = () => {
  const [posts, setPosts] = useState([]);
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

  const getUser = async () => {
    const { data } = await axios.post("/api/user/me");
    setUser(data);
  };

  const handleLike = async (id) => {
    const { data } = await axios.put("/api/likes/like", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const handleUnLike = async (id) => {
    const { data } = await axios.put("/api/likes/unlike", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const handleDisLike = async (id) => {
    const { data } = await axios.put("/api/likes/dislike", {
      id: id,
      user: user._id,
    });

    fetchPostForLikes();
  };

  const handleDisUnlike = async (id) => {
    const { data } = await axios.put("/api/likes/disunlike", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const fetchPostForLikes = async () => {
    const { data } = await axios.post("/api/post/allPosts", {
      isPublic: true,
    });
    setPosts(data.reverse());
  };

  useEffect(() => {
    getUser();
    fetchPosts();
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
          <h1 className="text-xl">
            User - {user?.username ? user?.username : "Username"}
          </h1>
          <button className="btn btn-neutral" onClick={fetchPosts}>
            Reload
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
        {posts.map((post) =>
          post.image ? (
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
                            onClick={() => handleDisUnlike(post._id)} // Fix the function name here
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
