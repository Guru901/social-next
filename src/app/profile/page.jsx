"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { UserContext } from "../Context/UserContext";
import Nav from "@/Components/Nav";

const Profile = () => {
  const { user } = useContext(UserContext);

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
        <div className="flex justify-center">
          <div className="join w-[26rem]">
            <input
              className="join-item btn w-[8.66rem]"
              type="radio"
              name="options"
              aria-label="Public Posts"
            />
            <input
              className="join-item btn w-[8.66rem]"
              type="radio"
              name="options"
              aria-label="Private Posts"
            />
            <input
              className="join-item btn w-[8.66rem]"
              type="radio"
              name="options"
              aria-label="Liked Posts"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center gap-3 w-[26rem]">
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
            <div className="h-52 w-32">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/djna5slqw/image/upload/v1706962472/veqnfahhfwbhccrekzag.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
