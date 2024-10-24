"use client";

import Nav from "@/Components/Nav";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Spinner from "@/Components/Spinner";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";

const User = () => {
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [isFriend, setIsFriend] = useState(false);
  const [friendBtn, setFriendBtn] = useState("Add Friend");

  const { user: loggedInUser } = useUserStore();
  const pathName = usePathname();

  const PostItems = [
    {
      label: "Public Posts",
      selectedOption: "publicPosts",
    },
    {
      label: "Private Posts",
      selectedOption: "privatePosts",
    },
    {
      label: "Liked Posts",
      selectedOption: "likedPosts",
    },
  ];

  const id = pathName.split("/")[2]; // Keeping this for path-based extraction.

  const {
    data: user,
    isLoading: userLoading,
    isPending: userPending,
  } = useQuery({
    queryKey: ["get-user", id],
    queryFn: async () => {
      const { data } = await axios.post("/api/user/getUser", {
        id,
      });
      return data;
    },
  });

  const {
    data: posts,
    isLoading: postsLoading,
    isPending: postsPending,
  } = useQuery({
    queryKey: ["userPosts", selectedOption],
    queryFn: async () => {
      if (!user) return [];
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

  const mutation = useMutation({
    mutationKey: ["add-friendsd"],
    mutationFn: async () => {
      await axios.post("/api/user/addFriend", {
        from: loggedInUser?.username,
        fromAvatar: loggedInUser?.avatar,
        userId: user._id,
        type: "friendAdd",
      });

      setFriendBtn("Request Sent!");
    },
  });

  const addFriend = () => {
    mutation.mutate();
  };

  const checkFriend = async () => {
    try {
      const { data } = await axios.post("/api/user/checkFriend", {
        id,
        loggedInUser: loggedInUser?._id,
      });
      setIsFriend(data.success);
      if (data.success) {
        setFriendBtn("Friends Already");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkFriend();
  }, [loggedInUser]);

  if (userLoading || userPending || postsLoading || postsPending)
    return <Spinner />;

  return (
    <div className="flex flex-col gap-8 w-[100svw] min-h-screen">
      <Nav username={loggedInUser?.username} avatar={loggedInUser?.avatar} />
      <div>
        <div className="flex gap-8 items-center px-8">
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
          </div>
          <div>
            <h1 className="text-2xl">
              {user?.username ? user.username : "User"}
            </h1>
          </div>
        </div>
        <div className="flex max-w-md w-screen justify-end translate-y-[-20px] gap-2">
          {isFriend ? (
            <button className="btn" disabled>
              {friendBtn}
            </button>
          ) : (
            <button
              className="btn"
              onClick={addFriend}
              disabled={friendBtn === "Friends Already"}
            >
              {friendBtn}
            </button>
          )}
          <Link href={`/chat/${user?._id}`}>
            <button className="btn mr-5" disabled={!isFriend}>
              Message
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="divider m-0"></div>

        {isFriend && (
          <div className="flex justify-center w-[100svw] max-w-[26rem]">
            <div className="join w-[26rem]">
              {PostItems.map((postItem, index) => (
                <input
                  key={index}
                  className="join-item btn max-w-[8.66rem] w-[33%]"
                  name="options"
                  type="radio"
                  aria-label={postItem.label}
                  checked={selectedOption === postItem.selectedOption}
                  onChange={() => setSelectedOption(postItem.selectedOption)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-start items-center gap-2 w-[26rem] px-2">
            {posts?.map((post) => (
              <div key={post._id} className="h-52 w-32 mt-5 profile-post-img">
                <Link href={`/post/${post._id}`}>
                  {post.image?.endsWith(".mp4") ||
                  post.image?.endsWith(".mkv") ? (
                    <video
                      className="object-cover w-full h-full rounded-md"
                      src={post.image}
                      alt=""
                    />
                  ) : post.image ? (
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src={post.image}
                      alt=""
                    />
                  ) : (
                    <div className="object-cover w-full h-full rounded-md border-2 border-solid border-white flex justify-center items-center text-center">
                      <h1>Post Doesn't have an image</h1>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
