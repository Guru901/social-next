"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoLogOutSharp, IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";

const Sidebar = () => {
  const router = useRouter();

  const sideBarItemsPages = [
    {
      title: "Users",
      path: "/admin/users",
      icon: <FaUsers size={35} />,
    },
    {
      title: "Posts",
      path: "/admin/posts",
      icon: <PiUploadSimpleBold size={35} />,
    },
  ];

  const sideBarItemsUser = [
    {
      title: "Home",
      path: "/feed",
      icon: <FaHome size={35} />,
    },
    {
      title: "Logout",
      path: "",
      icon: <IoLogOutSharp size={35} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <IoSettings size={35} />,
    },
  ];

  const logOut = async () => {
    await axios.post("/api/user/logout");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-neutral m-1 rounded-md flex flex-col gap-3 fixed left-1 top-0">
      <div className="flex items-center justify-center gap-4 p-2">
        <div>
          <Image
            src={
              "https://avatars.githubusercontent.com/u/133991448?s=400&u=9c79a6abb7634e20d49a9c1f5c699aa07516982f&v=4"
            }
            width={70}
            height={30}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <h1 className="font-bold text-lg">Name - Gurvinder</h1>
          <h1 className="font-bold text-md">Role - Admin</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full items-start p-2">
        <h1 className="text-2xl font-bold">Pages</h1>
        {sideBarItemsPages.map((item) => (
          <Link
            key={item.path}
            className="hover:bg-[#181E23] w-full p-4 pr-40 rounded-md flex justify-start items-center gap-2"
            href={item.path}
          >
            {item.icon}
            <h1 className="font-semibold text-xl w-full text-start">
              {item.title}
            </h1>
          </Link>
        ))}
        <h1 className="text-2xl font-bold">User</h1>
        {sideBarItemsUser.map((item) => (
          <Link
            key={item.path}
            className="hover:bg-[#181E23] w-full p-4 pr-40 rounded-md flex justify-start items-center gap-2"
            href={item.path && item.path}
            onClick={item.path === "" ? logOut : undefined}
          >
            {item.icon}
            <h1 className="font-semibold text-xl w-full text-start">
              {item.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
