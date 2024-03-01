"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaGear } from "react-icons/fa6";

const Nav = ({ username, redirect = "/feed" }) => {
  const pathName = usePathname();

  return (
    <div className="navbar flex justify-between px-4 items-center w-[100svw] relative">
      {pathName === "/feed" ? (
        <>
          <h1 className="text-xl">{"User - " + username}</h1>
          <div className="flex gap-5">
            <Link href={"/meme"}>
              <button>
                <img src="/icons/Random.svg" alt="" />
              </button>
            </Link>
            <Link href={"/settings"}>
              <button>
                <FaGear size={20} />
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link href={redirect}>
            <button>
              <FaArrowLeft size={24} />
            </button>
          </Link>
          <div className="flex gap-5">
            <Link href={"/meme"}>
              <button>
                <img src="/icons/Random.svg" alt="" />
              </button>
            </Link>
            <Link href={"/settings"}>
              <button>
                <FaGear size={20} />
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Nav;
