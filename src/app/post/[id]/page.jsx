"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import Image from "next/image";
import { getDateDifference } from "@/functions/getDate";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import AddComment from "./addComment";
import Comments from "./comments";
import { Options } from "./options";

const Post = () => {
  const [post, setPost] = useState({});

  const pathname = usePathname();

  const { user } = useUserStore();

  const postIDArray = pathname.split("/post/");
  const postID = postIDArray.length > 1 ? postIDArray[1] : null;

  const {
    data,
    isLoading: isPostLoading,
    isError,
    isPending,
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

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 1000);
  }, []);

  if ((isPostLoading, isPending, isCommentsLoading)) return <Spinner />;
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

              <Options post={post} setPost={setPost} />

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

            <AddComment refetch={refetch} postID={postID} />
            <div className="flex flex-col gap-2 items-center">
              <Comments
                comments={comments}
                isCommentsLoading={isCommentsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
