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
import { emojiSvg } from "../emojiSVG";
import { useRouter } from "next/navigation";
import Image from "next/image";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getDateDifference } from "@/functions/getDate";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const [form, setForm] = useState({});
  const [picker, setPicker] = useState(false); // set initial state for picker
  const [post, setPost] = useState({});

  const inpRef = useRef();
  const pickerRef = useRef();
  const toastRef = useRef();
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUserStore();

  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

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

  const {
    data,
    isLoading: isPostLoading,
    isError,
  } = useQuery({
    queryKey: ["get-post"],
    queryFn: async () => {
      const { data } = await axios.post(`/api/post/getPost/${postID}`, {
        postid: postID,
      });
      setPost(data);
      return data;
    },
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-comments", postID],
    queryFn: async () => {
      const { data } = await axios.post("/api/post/getComments", {
        postID: postID,
      });
      return data.reverse();
    },
  });

  const deletePost = async () => {
    const { data } = await axios.post("/api/post/delete", {
      id: post._id,
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
      refetch();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put("/api/likes/like", {
        id: id,
        user: user?._id,
      });
      // Update likes/dislikes count after successful like
      setPost((prevPost) => ({
        ...prevPost,
        likes: [...(prevPost?.likes || []), user?._id],
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnLike = async (id) => {
    try {
      await axios.put("/api/likes/unlike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost?.likes?.filter((like) => like !== user?._id),
      }));
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleDisLike = async (id) => {
    try {
      await axios.put("/api/likes/dislike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        dislikes: [...(prevPost?.dislikes || []), user?._id],
      }));
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleDisUnlike = async (id) => {
    try {
      await axios.put("/api/likes/disunlike", {
        id: id,
        user: user?._id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        dislikes: prevPost?.dislikes?.filter(
          (dislike) => dislike !== user?._id
        ),
      }));
    } catch (error) {
      console.error("Error removing dislike from post:", error);
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if ((isPostLoading, isCommentsLoading)) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <div className="w-full flex flex-col justify-center pl-1">
      <Nav username={user?.username} avatar={user?.avatar} />
      <div className="flex flex-col items-center p-2 gap-4 w-screen">
        <div className="flex flex-col gap-4 w-sreen">
          <div className="w-screen px-2 flex justify-center pt-4">
            <div className="flex flex-col gap-4 justify-center w-screen max-w-96 overflow-hidden">
              <h1 className="text-3xl">{post?.title}</h1>
              {post?.image &&
              (post.image.endsWith(".mp4") || post.image.endsWith(".mkv")) ? (
                <video
                  controls
                  className="rounded-lg mx-auto"
                  width="100%"
                  height="auto"
                >
                  <source src={post.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : post?.image ? (
                <Image
                  src={post.image}
                  className="rounded-lg mx-auto"
                  width={358}
                  height={158}
                  alt={post.title}
                />
              ) : (
                ""
              )}
              <div>
                <p className="text-base">{post?.body}</p>
              </div>

              <div className="flex gap-4  p-2 rounded-xl">
                <div className="flex items-center gap-1">
                  {user && post?.likes?.includes(user?._id) ? (
                    <div className="flex items-center justify-center gap-1">
                      <AiFillLike
                        size={28}
                        onClick={() => handleUnLike(post._id)}
                        className="cursor-pointer"
                      />
                      <h1 className="text-xl">{post?.likes?.length}</h1>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <AiOutlineLike
                        size={28}
                        onClick={() => handleLike(post._id)}
                        className="cursor-pointer"
                      />
                      <h1 className="text-xl">{post?.likes?.length}</h1>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1  mt-1">
                  {user && post?.dislikes?.includes(user?._id) ? (
                    <div className="flex items-center justify-center gap-2">
                      <AiFillDislike
                        size={28}
                        onClick={() => handleDisUnlike(post._id)}
                        className="cursor-pointer"
                      />
                      <h1 className="text-xl">{post?.dislikes?.length}</h1>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <AiOutlineDislike
                        size={28}
                        onClick={() => handleDisLike(post._id)}
                        className="cursor-pointer"
                      />
                      <h1 className="text-xl">{post?.dislikes?.length}</h1>
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
                  {post?.user === user?._id && (
                    <div>
                      <button
                        className="btn min-h-10 h-10"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        Delete Post
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <p className="py-4">
                            Are you sure you want to delete this post
                          </p>
                          <div className="modal-action flex">
                            <button className="btn" onClick={deletePost}>
                              Yes
                            </button>
                            <form method="dialog">
                              <button className="btn">No</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-sm font-bold">
                {getDateDifference(post?.createdAt)?.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="pl-[4vw]">
              <h1 className="text-xl font-semibold">
                Comments - {comments?.length}
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <label className="relative w-[69vw] max-w-xl input input-bordered flex items-center gap-2 justify-between">
                  <input
                    type="text"
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    ref={inpRef}
                    name="comment"
                    className="w-[90%] bg-transparent"
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
            <div className="flex flex-col gap-2 items-center">
              <div className="w-[96vw] max-w-xl">
                {isCommentsLoading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <div
                      className="flex border-solid border-white p-2 gap-4 items-center justify-start"
                      key={comment._id || index}
                    >
                      <div className="flex items-start">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          {comment.avatar ? (
                            <img
                              src={comment.avatar}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full">
                              <FaUser size={60} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                          <h1 className="font-bold text-xl break-words">
                            {comment.user ? comment.user : "Ni Batu :)"}
                          </h1>
                          <h1 className="text-sm font-semibold">
                            {getDateDifference(comment?.createdAt)}
                          </h1>
                        </div>
                        <h1 className="break-words">{comment.text}</h1>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
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
