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

const Post = () => {
  const [post, setPost] = useState([]);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const inpRef = useRef();
  const toastRef = useRef();
  const pathname = usePathname();

  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

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

  const getUser = async () => {
    const { data } = await axios.post("/api/user/me");
    setUser(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/post/comment", {
        comment: form.comment,
        postID: postID,
        user: user,
        avatar: user.avatar ? user.avatar : "",
      });
      inpRef.current.value = "";
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async (id) => {
    await axios.put("/api/likes/like", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const handleUnLike = async (id) => {
    await axios.put("/api/likes/unlike", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const handleDisLike = async (id) => {
    await axios.put("/api/likes/dislike", {
      id: id,
      user: user._id,
    });

    fetchPostForLikes();
  };

  const handleDisUnlike = async (id) => {
    await axios.put("/api/likes/disunlike", {
      id: id,
      user: user._id,
    });
    fetchPostForLikes();
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toastRef.current.style.display = "block";
      setInterval(() => {
        toastRef.current.style.display = "none";
      }, 1000);
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
    <div>
      <Nav />
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="flex flex-col gap-4 mb-40">
          <div className="px-2">
            {post.map((x) => (
              <div key={x._id} className="flex flex-col gap-4">
                <h1 className="text-3xl">{x.title}</h1>
                {x.image &&
                (x.image.endsWith(".mp4") || x.image.endsWith(".mkv")) ? (
                  <video
                    controls
                    className="rounded-lg"
                    width="100%"
                    height="auto"
                  >
                    <source src={x.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : x.image ? (
                  <img src={x.image} className="rounded-lg" alt={x.title} />
                ) : (
                  ""
                )}
                <pre className="text-base">{x.body}</pre>
                <div className="flex gap-4  p-2 rounded-xl">
                  <div className="flex items-center gap-1">
                    {x.likes.includes(user?._id) ? (
                      <div className="flex items-center justify-center gap-1">
                        <AiFillLike
                          size={28}
                          onClick={() => handleUnLike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x.likes.length}</h1>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <AiOutlineLike
                          size={28}
                          onClick={() => handleLike(x._id)}
                          className="cursor-pointer"
                        />

                        <h1 className="text-xl">{x.likes.length}</h1>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1  mt-1">
                    {x.dislikes.includes(user?._id) ? (
                      <div className="flex items-center justify-center gap-2">
                        <AiFillDislike
                          size={28}
                          onClick={() => handleDisUnlike(x._id)}
                          className="cursor-pointer"
                        />
                        <h1 className="text-xl">{x.dislikes.length}</h1>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <AiOutlineDislike
                          size={28}
                          onClick={() => handleDisLike(x._id)}
                          className="cursor-pointer"
                        />

                        <h1 className="text-xl">{x.dislikes.length}</h1>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn rounded-lg flex items-center justify-center h-8 py-0 min-h-8"
                      onClick={copyUrlToClipboard}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl">Comments - </h1>
            <div className="flex">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Your Comment.."
                  name="comment"
                  className="input input-bordered w-full"
                  onChange={(e) => setForm({ [e.target.name]: e.target.value })}
                  ref={inpRef}
                />
                <button className="btn" type="submit">
                  Comment
                </button>
              </form>
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
                        <FaUser />
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
      <div
        className="toast toast-top toast-center"
        ref={toastRef}
        style={{ display: "none" }}
      >
        <div className="alert alert-success">
          <span>URL copied</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
