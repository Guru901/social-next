"use client";

import React from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/Components/Nav";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

const AllFriends = () => {
  const { user } = useUserStore();

  const dummyAvatar =
    "https://imgs.search.brave.com/TwVw7arJQxAwQvyjdplJ7bVbGqyaUDjZ0SV5ZqqTwx0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubmV3czlsaXZl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS9CaHVw/ZW5kcmEtSm9naS5w/bmc_dz04MDImZW5s/YXJnZT10cnVl";

  const { data: friends, isLoading } = useQuery({
    queryKey: ["get-friends", user?._id],
    queryFn: async () => {
      const { data } = await axios.post("/api/user/getFriends", {
        loggedInUser: user?._id,
      });
      return data;
    },
  });

  if (isLoading) return <Spinner />;
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
