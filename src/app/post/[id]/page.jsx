"use client";

import Nav from "@/Components/Nav";
import { UserContext } from "@/app/Context/UserContext";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Post = () => {
  const [post, setPost] = useState([]);
  const [form, setForm] = useState({});
  const [comments, setComments] = useState([]);

  const { user } = useContext(UserContext);

  const pathname = usePathname();

  // getting the id of the post from the url
  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/post/comment", {
      comment: form.comment,
      postID: postID,
      user: user,
      avatar: user.avatar ? user.avatar : "",
    });

    setComments([data]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.post(`/api/post/getPost/${postID}`, {
        postid: postID,
      });
      setPost([data]);
    };

    const fetchComments = async () => {
      const { data } = await axios.post("/api/post/getComments", {
        postID: postID,
      });

      setComments(data.reverse());
    };

    fetchComments();
    fetchPost();
  }, [comments]);

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="flex flex-col gap-4 mb-40">
          <div>
            {post.map((x) => (
              <div key={x._id} className="flex flex-col gap-4">
                <h1 className="text-3xl">{x.title}</h1>
                <img src={x.image} className="rounded-lg" />
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
