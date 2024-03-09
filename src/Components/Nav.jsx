"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaGear } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";

const Nav = ({ username, redirect = "/feed" }) => {
  const pathName = usePathname();

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
      path: "/settings/edit",
    },
  ];

  return (
    <div className="navbar flex-col w-[100svw] relative">
      {pathName === "/feed" || pathName === "/profile" ? (
        <>
          <div className="flex justify-between items-center w-[100svw] px-2">
            <h1 className="text-xl">{"Hi " + username}</h1>
            <div className="flex gap-5 items-center px-8">
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
              <div className="absolute top-0 right-0 bg-[#2A323C] z-50 w-36 rounded-md p-3 flex flex-col gap-2">
                {dropDownMenu.map((x) => (
                  <div
                    key={x.path}
                    className="border-[1px] border-solid border-white"
                  >
                    <Link href={x.path}>
                      <h1>{x.title}</h1>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-between w-[100svw] items-center px-4">
          <Link href={redirect}>
            <button>
              <FaArrowLeft size={24} />
            </button>
          </Link>
          <div className="flex gap-5 items-center px-8">
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
