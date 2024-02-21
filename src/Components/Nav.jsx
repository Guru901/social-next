"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const Nav = ({ username }) => {
  const router = useRouter();
  const logOut = async () => {
    const { data } = await axios.post("/api/user/logout");
    router.push("/login");
  };
  const pathName = usePathname();

  return (
    <div>
      <div className="navbar flex justify-between px-4 items-center w-[100svw]">
        {pathName === "/feed" ? (
          <h1 className="text-xl">{"User - " + username}</h1>
        ) : (
          <Link href={"/feed"}>
            <button>
              <FaArrowLeft size={24} />
            </button>
          </Link>
        )}

        <div className="flex gap-2">
          <button
            className="btn rounded-lg flex items-center justify-center"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Nav;
