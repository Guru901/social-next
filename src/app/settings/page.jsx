"use client";

import React from "react";
import Nav from "../../Components/Nav";
import { FaBell, FaFeather, FaGears, FaUser } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const logOut = async () => {
    await axios.post("/api/user/logout");
    router.push("/login");
  };
  return (
    <div>
      <Nav />
      <div className="settings flex gap-2 flex-col">
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/profile">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaUser />
              </div>
              <div>
                <button className="mt-1 w-[80vw] flex justify-start">
                  Edit Profile
                </button>
                <p className="text-xs">still can't change username</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/account">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaGears />
              </div>
              <button className="w-[80vw] flex justify-start">Account</button>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/profile">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaBell />
              </div>
              <div>
                <button className="w-[80vw] flex justify-start">
                  Notifications
                </button>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaFeather />
              </div>
              <div>
                <button className="w-[80vw] flex justify-start">
                  Give Feedback
                </button>
                <p className="text-xs">
                  Ni diya too bhoot le jaayenge uthha ke
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
            <div>
              <RiLogoutBoxFill />
            </div>
            <div className="w-full">
              <button className="w-[80vw] flex justify-start" onClick={logOut}>
                Logout
              </button>
              <p className="text-xs">gaddari karbe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
