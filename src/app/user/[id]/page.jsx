"use client";

import Nav from "@/Components/Nav";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";

const User = () => {
  const [user, setUser] = useState();
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friend, setFriend] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [friendBtn, setFriendBtn] = useState("Add Friend");

  const addBtnRef = useRef();

  const pathName = usePathname();
  const router = useRouter();

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



  const id = pathName.split("/")[2];

  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.post("/api/user/me");
      setLoggedInUser(data);
    } catch (error) { }
  };

  const getUserSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/getUser", {
        id,
      });
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    setLoading(true);

    if (user && user._id) {
      const { data } = await axios.post("/api/user/getPosts", {
        user: user._id,
        isPublic: selectedOption === "publicPosts",
      });

      setPosts(data.reverse());
      setLoading(false);
    }

    if (selectedOption === "likedPosts") {
      const { data } = await axios.post("/api/likes/getLikedPosts", {
        id: user._id,
      });

      setPosts(data.reverse());
      setLoading(false);
    }
  };

  const addFriend = async () => {
    const { data } = await axios.post("/api/user/addFriend", {
      from: loggedInUser?.username,
      fromAvatar: loggedInUser?.avatar,
      userId: user._id,
      type: "friendAdd",
    });
    setFriendBtn("Friend Added!");
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
    getLoggedInUser();
    getUserSearch();
  }, []);

  useEffect(() => {
    checkFriend();
  }, [loggedInUser]);

  useEffect(() => {
    getUserPosts();
  }, [selectedOption, user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 w-[100svw] min-h-screen">
      <Nav />
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
          {friend ? (
            <button className="btn" disabled>
              {friendBtn}
            </button>
          ) : (
            <button
              className="btn"
              onClick={addFriend}
              ref={addBtnRef}
              disabled={friendBtn === "Friends Already"}
            >
              {friendBtn}
            </button>
          )}
          <Link href={`/chat/${user?._id}`}>
            <button className="btn  mr-5" disabled={true}>
              Message
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full overflow-hidden">
        <div className="divider m-0"></div>

        {isFriend && (
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
        )}

        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-start items-center gap-2 w-[26rem] px-2">
            {posts.map((post) => (
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
                      <h1>Post Doesnt have image</h1>
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
