"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/Components/Nav";

const AllFriends = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setloading] = useState(true);
  const [friends, setFriends] = useState([]);

  const getLoggedInUser = async () => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/user/me");
      setLoggedInUser(data);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const dummyAvatar =
    "https://imgs.search.brave.com/TwVw7arJQxAwQvyjdplJ7bVbGqyaUDjZ0SV5ZqqTwx0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubmV3czlsaXZl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS9CaHVw/ZW5kcmEtSm9naS5w/bmc_dz04MDImZW5s/YXJnZT10cnVl";

  const getAllFriends = async () => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/user/getFriends", {
        loggedInUser: loggedInUser?._id,
      });
      setFriends(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  useEffect(() => {
    getAllFriends();
  }, [loggedInUser]);

  if (loading) return <Spinner />;
  return (
    <div>
      <Nav />
      <div className="flex flex-wrap justify-center gap-3 py-5 w-[100vw]">
        {Array.isArray(friends) &&
          friends.length > 0 &&
          friends.map((friend) => (
            <Link href={`/user/${friend?._id}`} key={friend?._id}>
              <div className="card w-[45vw] max-w-48 bg-base-100 shadow-xl image-full ">
                <figure>
                  {friend?.avatar ? (
                    <Image
                      src={friend.avatar}
                      width={384}
                      height={208}
                      className="friendAvatar"
                      alt={friend.username}
                    />
                  ) : (
                    <img
                      className="h-full w-full object-cover"
                      src={dummyAvatar}
                    />
                  )}
                </figure>
                <div className="card-body friendCard">
                  <h2 className="card-title w-full h-full flex items-end justify-center text-xl sm:text-3xl">
                    {friend?.username}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AllFriends;
