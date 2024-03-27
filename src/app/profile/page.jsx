"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { FaArrowLeft, FaGear, FaUser } from "react-icons/fa6";
import Nav from "@/Components/Nav";
import Image from "next/image";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [publicPosts, setPublicPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const PostItems = [
    {
      lable: "Public Posts",
      selectedOption: "publicPosts",
      selected:true
    },
    {
      lable: "Private Posts",
      selectedOption: "privatePosts"
    },
    {
      lable: "Liked Posts",
      selectedOption: "likedPosts"
    },
  ]

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
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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
      <Nav username={user?.username} />
      <div className="flex gap-8 items-center px-8 justify-evenly">
        <div className="flex flex-col gap-2">
          {user?.avatar ? (
            <div className="avatar">
              <div className="w-24 rounded-full">
                <Image
                  src={user?.avatar ? user.avatar : ""}
                  width={96}
                  height={96}
                  alt={user?.username}
                />
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
              <FaUser size={70} />
            </div>
          )}

          <div>
            <h1 className="text-2xl">
              {user?.username ? user.username : "User"}
            </h1>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-center text-lg">{user?.friends?.length}</h1>
            <h1 className="text-center text-lg">Frnds</h1>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-center text-lg">{publicPosts?.length}</h1>
            <h1 className="text-center text-lg">Posts</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="divider m-0"></div>

        {/* Radio buttons section */}
        <div className="flex justify-center w-[100svw] max-x-[26rem]">
          <div className="join w-[26rem]">
            {PostItems.map(postItem => (
              <input
                className="join-item btn max-w-[8.66rem] w-[33%]"
                name="options"
                type="radio"
                aria-label={postItem.lable}
                checked={selectedOption === postItem.selectedOption}
                onChange={() => setSelectedOption(postItem.selectedOption)}
              />
            ))
            }
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
