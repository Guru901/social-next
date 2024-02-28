"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { FaArrowLeft, FaGear } from "react-icons/fa6";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [publicPosts, setPublicPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

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

    if (selectedOption === "likedPosts") {
      const { data } = await axios.post("/api/likes/getLikedPosts", {
        id: user._id,
      });

      setPublicPosts(data.reverse());
      setLoading(false);
    }
  };

  const getUser = async () => {
    const { data } = await axios.post("/api/user/me");
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserPost();
  }, [selectedOption, user]);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-8 w-[100svw] min-h-screen">
      <div className="navbar flex justify-between px-4 items-center w-[100svw]">
        <Link href="/feed">
          <button>
            <FaArrowLeft size={24} />
          </button>
        </Link>
        <Link href={"/settings"}>
          <button>
            <FaGear size={20} />
          </button>
        </Link>
      </div>
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
          <div className="join w-[26rem]">
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
            {publicPosts.map((post, index) => (
              <div
                key={post._id}
                className="h-52 w-32 mt-5 profile-post-img relative"
              >
                {post.image ? (
                  <div className="h-52">
                    <Link href={`/post/${post._id}`}>
                      <img
                        className="object-cover w-full h-full rounded-md"
                        src={post.image}
                        alt=""
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="object-cover w-full h-full rounded-md border-2  border-solid border-white flex justify-center items-center text-center relative">
                    <Link href={`/post/${post._id}`}>
                      <div className="h-52 flex justify-center items-center w-full cursor-pointer">
                        <h1>Post Image here</h1>
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
