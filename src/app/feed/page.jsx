"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "@/Components/Spinner";
import Nav from "@/Components/Nav";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PostCardWithoutMedia from "@/Components/PostCardWithoutMedia";
import PostCardWithMedia from "@/Components/PostCardWithMedia";
import { FetchOptions } from "./fetchOptions";

const Feed = () => {
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("global");

  const { user } = useUserStore();

  const params = useSearchParams();

  const {
    isLoading,
    data: posts,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["posts", selectedOption],
    queryFn: async () => {
      if (selectedOption === "global") {
        const { data } = await axios.post("/api/post/allPosts", {
          isPublic: true,
          topic: "general",
        });
        return data.reverse();
      } else {
        const { data } = await axios.post("/api/post/friendsPost", {
          user: user._id,
        });

        return data.reverse();
      }
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      console.log(err);
      setError(true);
    },
  });

  if (error) {
    return <div>An error occurred</div>;
  }
  useEffect(() => {
    if (params.get("from") === "post") {
      refetch();
    }
  }, []);

  if (isLoading || isPending) return <Spinner />;

  return (
    <>
      <div className="flex justify-center">
        <Nav />
      </div>
      <div className="mt-2 flex w-screen max-w-96 justify-between items-center mx-auto">
        <FetchOptions
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="flex feedContainer flex-col justify-center items-center gap-5 p-6 pb-16 w-screen">
        {posts?.map((post) =>
          post.image ? (
            <PostCardWithMedia post={post} refetch={refetch} />
          ) : (
            <PostCardWithoutMedia post={post} refetch={refetch} />
          ),
        )}
      </div>
    </>
  );
};

export default Feed;
