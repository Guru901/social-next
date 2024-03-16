"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import { FaUser } from "react-icons/fa6";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getDateDifference } from "@/functions/getDate";

const Post = () => {
  const [post, setPost] = useState([]);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [picker, setPicker] = useState(false); // set initial state for picker

  const inpRef = useRef();
  const pickerRef = useRef();
  const toastRef = useRef();
  const pathname = usePathname();
  const router = useRouter();

  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

  const emojiSvg = (
    <svg
      id="emoji"
      viewBox="0 0 72 72"
      className="w-6 h-6 opacity-70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="color">
        <circle cx="36.0001" cy="36" r="22.9999" fill="currentColor" />
      </g>
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        <circle
          cx="36"
          cy="36"
          r="23"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M45.8149,44.9293 c-2.8995,1.6362-6.2482,2.5699-9.8149,2.5699s-6.9153-0.9336-9.8149-2.5699"
        />
        <path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
        <path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
      </g>
    </svg>
  );

  const selectEmoji = (e) => {
    e.preventDefault();
    setPicker(!picker);
  };

  const handleEmojiSelect = (emoji) => {
    setForm({
      ...form,
      comment: `${form.comment || ""}${emoji.native}`,
    });
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/post/getPost/${postID}`, {
        postid: postID,
      });
      setPost([data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  const getUser = async (retryCount = 3) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 504 && retryCount > 0) {
        console.log(`Retrying getUser... Attempts left: ${retryCount}`);
        setTimeout(() => getUser(retryCount - 1), 1000); // You can adjust the delay and retry count as needed
      } else {
        setError("Error occurred");
      }
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/post/getComments", {
        postID: postID,
      });
      setComments(data.reverse());
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const deletePost = async () => {
    const { data } = await axios.post("/api/post/delete", {
      id: post[0]?._id,
    });

    if (data.success) {
      router.push("/feed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPicker(false);

      await axios.post("/api/post/comment", {
        comment: form.comment,
        postID: postID,
        user: user,
        avatar: user?.avatar ? user?.avatar : "",
      });
      setForm({ comment: "" });
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async (id) => {
    await axios.put("/api/likes/like", {
      id: id,
      user: user?._id,
    });
    fetchPostForLikes();
  };

  const handleUnLike = async (id) => {
    await axios.put("/api/likes/unlike", {
      id: id,
      user: user?._id,
    });
    fetchPostForLikes();
  };

  const handleDisLike = async (id) => {
    await axios.put("/api/likes/dislike", {
      id: id,
      user: user?._id,
    });

    fetchPostForLikes();
  };

  const handleDisUnlike = async (id) => {
    await axios.put("/api/likes/disunlike", {
      id: id,
      user: user?._id,
    });
    fetchPostForLikes();
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const fetchPostForLikes = async () => {
    try {
      const { data } = await axios.post(`/api/post/getPost/${postID}`, {
        postid: postID,
      });
      setPost([data]);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    const commentsInterval = setInterval(fetchComments, 1000);
    return () => {
      clearInterval(commentsInterval);
    };
  }, []);

  useEffect(() => {
    getUser();
    fetchPost();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="w-full flex flex-col justify-center pl-1">
      <Nav />
      <div className="flex flex-col items-center p-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="px-2">
            {post.map((x) => (
              <div key={x._id} className="flex flex-col gap-4 justify-center">
                <h1 className="text-3xl">{x?.title}</h1>
                {x.image &&
                (x.image.endsWith(".mp4") || x.image.endsWith(".mkv")) ? (
                  <video
                    controls
                    className="rounded-lg mx-auto"
                    width="100%"
                    height="auto"
                  >
                    <source src={x.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : x.image ? (
                  <Image
                    src={x.image}
                    className="rounded-lg mx-auto"
                    width={358}
                    height={158}
                    alt={x.title}
                  />
                ) : (
                  ""
                )}
                <p className="text-base">{x.body}</p>
                <div className="flex gap-4  p-2 rounded-xl">
                  <div className="flex items-center gap-1">
                    {user && x?.likes?.includes(user?._id) ? (
                      <div className="flex items-center justify-center gap-1">
                        <AiFillLike
                          size={28}
                          onClick={() => handleUnLike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x?.likes?.length}</h1>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <AiOutlineLike
                          size={28}
                          onClick={() => handleLike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x?.likes?.length}</h1>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1  mt-1">
                    {user && x?.dislikes?.includes(user?._id) ? (
                      <div className="flex items-center justify-center gap-2">
                        <AiFillDislike
                          size={28}
                          onClick={() => handleDisUnlike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x?.dislikes?.length}</h1>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <AiOutlineDislike
                          size={28}
                          onClick={() => handleDisLike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x?.dislikes?.length}</h1>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn rounded-lg flex items-center justify-center h-10 py-0 min-h-10"
                      onClick={copyUrlToClipboard}
                    >
                      Share
                    </button>
                    {x?.user === user?._id && (
                      <div>
                        <button
                          className="btn min-h-10 h-10"
                          onClick={deletePost}
                        >
                          Delete Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="text-sm font-bold">
                  {getDateDifference(x.createdAt)?.toLocaleString()}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl">Comments - </h1>
            <div className="flex flex-col items-center">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <label className="relative w-[60vw] max-w-xl input input-bordered flex items-center gap-2 justify-between">
                  <input
                    type="text"
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    ref={inpRef}
                    name="comment"
                    className="w-xl bg-transparent"
                    placeholder="Enter Your Comment.."
                  />
                  <button onClick={selectEmoji}>{emojiSvg}</button>
                </label>
                <button className="btn" type="submit">
                  Comment
                </button>
              </form>

              <div>
                {picker && (
                  <div className="absolute right-0" ref={pickerRef}>
                    <Picker
                      theme={"dark"}
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      maxFrequentRows={0}
                    />
                  </div>
                )}
              </div>
            </div>
            {comments.map((comment, index) => (
              <div
                className="flex border-solid border-white p-2 gap-4 items-center"
                key={comment._id || index}
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full ">
                        <FaUser size={60} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl w-[70vw] break-words">
                    {comment.user ? comment.user : "Ni Batu :)"}
                  </h1>
                  <h1 className="w-[70vw] break-words">{comment.text}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={toastRef} style={{ display: "none" }}>
        <div className="alert alert-success">
          <span>URL copied</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
