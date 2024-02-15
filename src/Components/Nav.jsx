"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const Nav = () => {
  const router = useRouter();
  const logOut = async () => {
    const { data } = await axios.post("/api/user/logout");
    router.push("/login");
  };

  return (
    <div>
      <div 
        className="navbar flex justify-between px-5 items-center w-[100svw]">
        
        <Link href={"/feed"}>
          <button>
            <FaArrowLeft size={24} />
          </button>
        </Link>
        <button className="btn px-4" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
