"use client";

import Nav from "@/Components/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/navigation";

const User = () => {
  const [user, setUser] = useState();
  const [selectedOption, setSelectedOption] = useState("publicPosts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friend, setFriend] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();

  const pathName = usePathname();
  const router = useRouter();

  const id = pathName.split("/")[2];

  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.post("/api/user/me");
      setLoggedInUser(data);
    } catch (error) {
      alert("ERROR");
    }
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
      alert("ERROR");
      setLoading(false);
    }
  };

  const getUser = async (retryCount = 3) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 504 && retryCount > 0) {
        console.log(`Retrying getUser... Attempts left: ${retryCount}`);
        setTimeout(() => getUser(retryCount - 1), 1000); // You can adjust the delay and retry count as needed
      } else {
        setError("Error occurred");
      }
    }
  };

  const getUserPosts = async () => {
    try {
      const { data } = await axios.post("/api/post/getPost", {
        id,
      });

      setPosts(data.posts.reverse());
    } catch (error) {
      console.error("Error fetching user posts:", error);
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

    console.log(data);
  };

  useEffect(() => {
    getUser();
    getUserPosts();
    getLoggedInUser();
    getUserSearch();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-8 w-[100svw] min-h-screen">
      <Nav redirect={"/search"} />
      <div>
        <div className="flex gap-8 items-center px-8">
          <div className="w-36 h-36 rounded-full bg-[#A6ADBB] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user?.avatar ? user.avatar : ""}
              alt={user?.username}
            />
          </div>
          <div>
            <h1 className="text-2xl">
              {user?.username ? user.username : "User"}
            </h1>
          </div>
        </div>
        <div className="flex max-w-md w-screen justify-end translate-y-[-20px] gap-2">
          <button className="btn" onClick={addFriend}>
            {friend ? "Friend Added!" : "Add Friend"}
          </button>
          <Link href={`/chat/${user._id}`}>
            <button className="btn  mr-5">Message</button>
          </Link>
        </div>
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
