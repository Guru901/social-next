"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaGear } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
// import "./navigation.css";

const Nav = ({ username }) => {
  const pathName = usePathname();
  const router = useRouter();

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownToggle = () => {
    setShowDropDown(!showDropDown);
  };

  const dropDownMenu = [
    {
      title: "Friends",
      path: "/friends",
    },
    {
      title: "Edit Profile",
      path: "/settings/profile",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="navbar flex items-center flex-col w-[90svw] relative overflow-x-hidden px-4">
      {pathName === "/feed" || pathName === "/profile" ? (
        <>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl">{"Hi, " + username}</h1>
            <div className="flex gap-5 items-center">
              <Link href={"/notifications"}>
                <button>
                  <IoMdNotifications size={25} />
                </button>
              </Link>
              <Link href={"/settings"}>
                <button>
                  <FaGear size={20} />
                </button>
              </Link>
              <div onClick={() => dropDownToggle()}>
                <button>
                  <img src="/icons/drop_down.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            {showDropDown && (
              <div className="absolute top-3 right-0 bg-[#2A323C] z-50 w-36 rounded-md p-4 flex flex-col gap-3">
                {dropDownMenu.map((x) => (
                  <div
                    key={x.path}
                    className="border-[1px] border-solid border-white "
                  >
                    <Link href={x.path}>
                      <h1 className="text-xl ">{x.title}</h1>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-between w-full items-center">
          <button onClick={handleBack}>
            <FaArrowLeft size={24} />
          </button>
          <div className="flex gap-5 items-center">
            <Link href={"/notifications"}>
              <button>
                <IoMdNotifications size={25} />
              </button>
            </Link>
            <Link href={"/settings"}>
              <button>
                <FaGear size={20} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Nav;
