"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const pathName = usePathname();

  const footerItems = [
    {
      path: "/feed",
      icon: "/icons/home.webp",
    },
    {
      path: "/vid",
      icon: "/icons/vid.webp",
    },
    {
      path: "/post",
      icon: "/icons/post.webp",
    },
    {
      path: "/search",
      icon: "/icons/search.webp",
    },
    {
      path: "/profile",
      icon: "/icons/user.webp",
    },
  ];

  return (
    <div
      className={`footerContainer ${
        pathName === "/login"
          ? "hidden"
          : "" || pathName === "/"
          ? "hidden"
          : ""
      }`}
    >
      <div className="f mt-16 btm-nav">
        {footerItems.map((footerItem) => (
          <div className="flex items-center h-full w-full justify-center">
            <Link href={footerItem.path}>
              <Image width={25} height={25} src={footerItem.icon} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
