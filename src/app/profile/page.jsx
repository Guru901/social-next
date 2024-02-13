"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../Context/UserContext";
import Nav from "@/Components/Nav";
import axios from "axios";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [publicPosts, setPublicPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserPost = async () => {
      setLoading(true);
      if (user && user._id) {
        const { data } = await axios.post("/api/user/getPosts", {
          user: user._id,
          isPublic: selectedOption === "publicPosts",
        });

        setPublicPosts(data.reverse());
        setLoading(false);
      }
    };

    getUserPost();
  }, [selectedOption, user]); //  // Include selectedOption in the dependency array

  return (
    <div className="flex flex-col gap-8 w-[100svw] min-h-screen">
      <Nav />
      <div className="flex gap-8 items-center px-8">
        <div className="w-40 h-40 rounded-full bg-[#A6ADBB] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user?.avatar ? user.avatar : ""}
            alt={user?.username}
          />
        </div>
        <h1 className="text-2xl">{user?.username ? user.username : "User"}</h1>
      </div>

      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="divider m-0"></div>

        {/* Radio buttons section */}
        <div className="flex justify-center w-[100svw] max-x-[26rem]">
          <div className="join">
            <input
              className="join-item btn max-w-[8.66rem] w-[33%]"
              type="radio"
              name="options"
              aria-label="Public Posts"
              checked={selectedOption === "publicPosts"}
              onChange={() => setSelectedOption("publicPosts")}
            />
            <input
              className="join-item btn max-w-[8.66rem] w-[33%]"
              type="radio"
              name="options"
              aria-label="Private Posts"
              checked={selectedOption === "privatePosts"}
              onChange={() => setSelectedOption("privatePosts")}
            />
            <input
              className="join-item btn max-w-[8.66rem] w-[33%]"
              type="radio"
              name="options"
              aria-label="Liked Posts"
              checked={selectedOption === "likedPosts"}
              onChange={() => setSelectedOption("likedPosts")}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-start items-center gap-2 w-[26rem] px-2">
            {loading ? (
              <div className="flex justify-center items-center h-[32vh] w-screen">
                <div className="spinner"></div>
              </div>
            ) : (
              publicPosts.map((post) => (
                <div key={post._id} className="h-52 w-32 mt-5 profile-post-img">
                  <Link href={`/post/${post._id}`}>
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src={post.image}
                      alt=""
                    />
                    <p className="absolute w-32 whitespace-nowrap overflow-hidden">
                      {post.title}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
