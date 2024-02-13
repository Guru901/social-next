"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Nav from "@/Components/Nav";

const Post = () => {
  const [post, setPost] = useState([]);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState([]);
  const inpRef = useRef();
  const [user, setUser] = useState();

  const pathname = usePathname();

  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

  const fetchPost = async () => {
    try {
      const { data } = await axios.post(`/api/post/getPost/${postID}`, {
        postid: postID,
      });
      setPost([data]);
    } catch (error) {
      console.error("Error fetching post:", error);
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

  useEffect(() => {
    const commentsInterval = setInterval(fetchComments, 1000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(commentsInterval);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  useEffect(() => {
    getUser();
    fetchPost();
  }, []);

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="flex flex-col gap-4 mb-40">
          <div>
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
                ) : (
                  // Otherwise, assume it's an image
                  <img src={x.image} className="rounded-lg" alt={x.title} />
                )}
                <h1 className="text-base">{x.body}</h1>
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
                      <div className="w-full h-full bg-white"></div>
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
    </div>
  );
};

export default Post;
