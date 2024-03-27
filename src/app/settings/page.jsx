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

  const settingsItems = [
    {
      title: "Edit Profile",
      desc: "still can't change username",
      icon: <FaUser />,
      link: "/settings/profile",
    },
    {
      title: "Change Password",
      desc: "still can't change username",
      icon: <FaUser />,
      link: "/settings/change__password",
    },
    {
      title: "Account",
      icon: <FaGears />,
      link: "/settings/account",
    },
    {
      title: "Notifications",
      icon: <FaBell />,
      link: "/settings/account",
    },
    {
      title: "Give Feedback",
      icon: <FaFeather />,
      desc: "Ni diya to bhoot le jaayege",
      link: "/settings/feedback",
    },
    {
      title: "Logout",
      icon: <FaGears />,
    },
  ];
  return (
    <div>
      <Nav />
      <div className="settings flex gap-2 flex-col">
        {settingsItems?.map((item) => (
          <div className="setting flex flex-row p-4 gap-8">
            {item.link ?(
              <Link href={item?.link}>
                <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
                  <div>{item?.icon}</div>
                  <div className="flex flex-col">
                    <div className="mt-1">{item.title}</div>
                    <p className="text-xs">{item?.desc}</p>
                  </div>
                </div>
              </Link>
            ):(
                <div className="card-title flex justify-start items-center gap-4 cursor-pointer" onClick={logOut}>
                  <div>{item?.icon}</div>
                  <div className="flex flex-col">
                    <div className="mt-1">{item.title}</div>
                    <p className="text-xs">{item?.desc}</p>
                  </div>
                </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
