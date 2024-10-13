"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import VidPlayer from "@/Components/VidPlayer";
import PostCardWithoutMedia from "@/Components/PostCardWithoutMedia";
import PostCardWithMedia from "@/Components/PostCardWithMedia";
import { useQuery } from "@tanstack/react-query";

const FetchTopicPosts = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const pathName = usePathname();

  const keyWord = pathName.split("/")[2];

  const { isLoading, data, refetch, isPending } = useQuery({
    queryKey: ["get-topics-posts", keyWord],
    queryFn: async () => {
      const { data } = await axios.post("/api/post/allPosts", {
        keyWord: keyWord,
      });
      console.log(data);
      setPosts(data);
      return data;
    },
  });

  if (isLoading || isPending) return <Spinner />;

  return (
    <div>
      <>
        <Nav username={user?.username} avatar={user?.avatar} />
        <div className="flex feedContainer flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
          {posts?.map((post) =>
            post.image ? (
              <PostCardWithMedia post={post} refetch={refetch} />
            ) : (
              <PostCardWithoutMedia post={post} refetch={refetch} />
            )
          )}
        </div>
      </>
    </div>
  );
};

export default FetchTopicPosts;
