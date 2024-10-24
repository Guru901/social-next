"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
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
      setPosts(data);
      return data;
    },
  });

  if (isLoading || isPending) return <Spinner />;

  return (
    <div>
      <>
        <Nav />
        <div className="flex feedContainer flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
          {posts?.map((post) =>
            post.image ? (
              <PostCardWithMedia post={post} refetch={refetch} key={post._id} />
            ) : (
              <PostCardWithoutMedia
                post={post}
                refetch={refetch}
                key={post._id}
              />
            )
          )}
        </div>
      </>
    </div>
  );
};

export default FetchTopicPosts;
