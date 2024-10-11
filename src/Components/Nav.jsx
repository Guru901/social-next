"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGear, FaUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { FaUserFriends, FaPlus, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { MdTopic } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const { user } = useUserStore();

  const router = useRouter();

  const ToogleNav = () => {
    setShowNav(!showNav);
  };

  const dropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const dropDownMenu = [
    {
      title: "Friends",
      path: "/friends",
      icon: <FaUserFriends size={20} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaGear size={20} />,
    },
    {
      title: "Logout",
      path: "",
      icon: <MdLogout size={20} />,
    },
  ];

  const navItems = [
    {
      title: "Home",
      icon: <IoHome size={20} />,
      path: "/feed",
    },
    {
      title: "Search",
      icon: <FaSearch size={20} />,
      path: "/search",
    },
    {
      title: "Post",
      icon: <FaPlus size={20} />,
      path: "/post",
    },
    {
      title: "Create Topic",
      icon: <IoIosCreate size={20} />,
      path: "/createTopic",
    },
    {
      title: "All Topics",
      icon: <MdTopic size={20} />,
      path: "/topic",
    },
  ];

  const logOut = async () => {
    await axios.post("/api/user/logout");
    router.push("/login");
  };

  return (
    <div className="navbar flex items-center flex-col w-[90svw] relative overflow-x-clip px-4 z-[9999999]">
      <div className="flex justify-between items-center w-full">
        <div style={{ zIndex: 50 }}>
          <button onClick={ToogleNav}>
            {showNav ? (
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="swap-off fill-current"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            )}
          </button>
        </div>

        {showNav && (
          <div
            className="h-screen pt-12 absolute left-0 top-0 z-20 flex flex-col justify-start gap-2 bg-[#0A1120]"
            style={{
              top: 0,
              zIndex: 22,
              width: "15rem",
              paddingTop: "4rem",
              left: 0,
              background: "#0A1120",
              padding-left: "14px"
            }}
          >
            {navItems.map((navItem) => (
              <div
                className="card w-full shadow-xl rounded-none navCard"
                key={navItem.title}
              >
                <Link href={navItem.path}>
                  <div className="card-body navItem gap-2 flex-row p-2 hover:bg-[#181e23]">
                    <h2 className="card-title">{navItem.icon}</h2>
                    <h2 className="card-title">{navItem.title}</h2>
                  </div>
                </Link>
              </div>
            ))}
            {user.username === "Admin" && (
              <Link href={"/admin/dashboard"}>
                <div className="card-body navItem gap-2 flex-row p-2 hover:bg-[#181e23]">
                  <h2 className="card-title">
                    <MdAdminPanelSettings />
                  </h2>
                  <h2 className="card-title">Admin</h2>
                </div>
              </Link>
            )}
            <div className="divider" style={{ margin: 0 }}></div>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <Link href={"/post"}>
            <button>
              <FaPlus size={25} />
            </button>
          </Link>
          <Link href={"/notifications"}>
            <button>
              <IoMdNotifications size={25} />
            </button>
          </Link>
          <div
            className="avatar flex items-center justify-center gap-2 cursor-pointer"
            onClick={dropDownToggle}
          >
            <div className="w-10 h-10 overflow-hidden rounded-full">
              {user?.avatar ? (
                <Image
                  width={40}
                  height={40}
                  src={user.avatar}
                  className="object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <FaUser size={35} />
                  {user?.username}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        {showDropDown && (
          <div className="dropDown bg-base-200 absolute right-0 flex flex-col">
            <div className="dropDownItem  rounded-lg p-4">
              <Link href={"/profile"}>
                <div className="flex items-center justify-end gap-2 ">
                  <div className="rounded-full overflow-hidden">
                    {user?.avatar ? (
                      <Image
                        src={user?.avatar}
                        width={55}
                        height={55}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser size={40} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">View Profile</h1>
                    <h1 className="text-sm">{user?.username}</h1>
                  </div>
                </div>
              </Link>
            </div>
            {dropDownMenu.map((x) => (
              <div
                key={x.path}
                onClick={x.title === "Logout" ? logOut : undefined}
              >
                <Link href={x.path}>
                  <div className="dropDownItem flex items-center justify-start gap-4 p-4">
                    {x?.icon}
                    <h1 className="text-xl">{x.title}</h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
