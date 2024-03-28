"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaGear, FaUserFriends } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import Image from "next/image";

import { MdLogout } from "react-icons/md";
import axios from "axios";

const Nav = () => {
  const [user, setUser] = useState();

  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.post("/api/user/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const dropDownMenu = [
    {
      title: "Settings",
      path: "/settings",
      icon: <FaGear size={20} />,
    },
    {
      title: "Logout",
      path: "/login",
      icon: <MdLogout size={20} />,
    },
  ];

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div className="navbar flex items-center flex-col w-[90svw] relative overflow-x-hidden px-4">
      <div className="flex justify-between items-center w-full">
        {/*<h1 className="text-xl">{"Hi, " + username}</h1>*/}
        <h1>Hi!</h1>
        <div className="flex gap-5 items-center">
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
              <Image
                width={40}
                height={40}
                src={user?.avatar}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end">
        {showDropDown && (
          <div className="dropDown absolute right-0 rounded-md flex flex-col gap-2">
            <div className="dropDownItem border-[1px] border-solid border-white bg-neutral-700 p-4">
              <Link href={"/profile"}>
                <div className="flex items-center justify-end gap-2 ">
                  <div className="rounded-full overflow-hidden">
                    <Image
                      src={user?.avatar}
                      width={55}
                      height={55}
                      className="object-cover"
                    />
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
                className="border-[1px] border-solid border-white"
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
