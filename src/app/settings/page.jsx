"use client";

import React from "react";
import Nav from "../../Components/Nav";
import { FaBell, FaFeather, FaGears, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

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
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaUser />
              </div>
              <div className="flex flex-col">
                <div className="mt-1">Edit Profile</div>
                <p className="text-xs">still can't change username</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/account">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaGears />
              </div>
              <div className="flex flex-col">
                <div>Account</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/profile">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaBell />
              </div>
              <div>Notifications</div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaFeather />
                <div className="flex flex-col">
                  <div>Notifications</div>
                </div>
                <div>Give Feedback</div>
                <p className="text-xs">ni diya to bhoot le jaayenge</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaFeather />
              </div>
              <div>Give Feedback</div>
              <p className="text-xs">ni diya to bhoot le jaayenge</p>
              <div className="flex flex-col">
                <div>Give Feedback</div>
                <p className="text-xs">ni diya to bhoot le jaayenge</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer flex-col">
              <div>
                <FaFeather />
              </div>
              <div>Give Feedback</div>
              <p className="text-xs">ni diya to bhoot le jaayenge</p>
            </div>
          </Link>
          <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
            <div>
              <FaFeather />
            </div>
            <div className="flex flex-col">
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
