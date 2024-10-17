"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { FaUser } from "react-icons/fa6";
import Nav from "@/Components/Nav";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const { user } = useUserStore();

  const PostItems = [
    { label: "Public Posts", selectedOption: "publicPosts" },
    { label: "Private Posts", selectedOption: "privatePosts" },
    { label: "Liked Posts", selectedOption: "likedPosts" },
  ];

  const {
    data: posts,
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["userPosts", selectedOption],
    queryFn: async () => {
      if (selectedOption === "likedPosts") {
        const { data } = await axios.post("/api/likes/getLikedPosts", {
          id: user._id,
        });
        return data.reverse();
      } else {
        const { data } = await axios.post("/api/user/getPosts", {
          user: user._id,
          isPublic: selectedOption === "publicPosts",
        });
        return data.reverse();
      }
    },
  });

  useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [selectedOption, user, refetch]);

  useEffect(() => {
    (async () => {
      if (!user) {
        const { data } = await axios.post("/api/user/me");
        setUser(data);
      }
    })();
  }, []);

  if (isLoading || isPending) return <Spinner />;
  return (
    <div className="flex flex-col w-[100svw] min-h-screen">
      <div>
        <Nav username={user?.username} avatar={user?.avatar} />
        <div className="flex gap-8 items-center justify-evenly">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              className="w-screen h-52 object-cover"
              alt={user?.username}
            />
          ) : (
            <div className="w-screen h-52"></div>
          )}
          <div
            className={`w-screen flex justify-center gap-20 items-center h-52 absolute ${
              user?.avatar ? "bg-[#000000]/[0.5]" : ""
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="flex gap-2 flex-col justify-center items-center">
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    width={110}
                    height={110}
                    alt={user?.username}
                    className="rounded-full"
                  />
                ) : (
                  <FaUser size={70} />
                )}
                <h1 className="text-xl font-bold">
                  {user?.username ? user.username : "User"}
                </h1>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="flex gap-1 text-sm text-gray-200">
                    <h1 className="text-center">{user?.friends?.length}</h1>
                    <h1 className="text-center">Friends</h1>
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 text-sm text-gray-200">
                    <h1 className="text-center">{posts?.length}</h1>
                    <h1 className="text-center">Posts</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="divider m-0"></div>
        {/* Radio buttons section */}
        <div className="flex justify-center w-[100svw] max-x-[26rem]">
          <div className="join w-[26rem]">
            {PostItems.map((postItem) => (
              <input
                className="join-item btn max-w-[8.66rem] w-[33%]"
                name="options"
                type="radio"
                key={postItem.label}
                aria-label={postItem.label}
                checked={selectedOption === postItem.selectedOption}
                onChange={() => setSelectedOption(postItem.selectedOption)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-start items-center gap-2 w-[26rem] px-2">
            {posts?.map((post, index) => (
              <div
                key={post._id}
                className="h-52 w-32 mt-5 profile-post-img relative"
              >
                {post.image ? (
                  <div className="h-52">
                    <Link href={`/post/${post._id}`}>
                      {post.image.endsWith(".mp4") ||
                      post.image.endsWith(".mkv") ? (
                        <video
                          className="object-cover w-full h-full rounded-md"
                          src={post.image}
                          alt=""
                        />
                      ) : (
                        <Image
                          className="rounded-md h-full object-cover"
                          width={128}
                          height={208}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          src={post.image}
                          alt={post?.title}
                        />
                      )}
                    </Link>
                  </div>
                ) : (
                  <div className="object-cover w-full h-full rounded-md border-2  border-solid border-white flex justify-center items-center text-center relative">
                    <Link href={`/post/${post._id}`}>
                      <div className="h-52 flex justify-center items-center w-full cursor-pointer">
                        <h1>Post Doesnt have image</h1>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
