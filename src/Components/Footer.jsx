"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const pathName = usePathname();
  const [isSidebar, setIsSidebar] = useState();

  const footerItems = [
    {
      path: "/feed",
      icon: "/icons/home.webp",
      label: "Home",
    },
    {
      path: "/vid",
      icon: "/icons/vid.webp",
      label: "Videos",
    },
    {
      path: "/post",
      icon: "/icons/post.webp",
      label: "Upload",
    },
    {
      path: "/search",
      icon: "/icons/search.webp",
      label: "Search",
    },
    {
      path: "/profile",
      icon: "/icons/user.webp",
      label: "Profile",
    },
  ];

  useEffect(() => {
    const width = window.innerWidth >= 1024;

    if (width) {
      setIsSidebar(true);
    } else {
      setIsSidebar(false);
    }
  }, []);

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
      <div className={`f mt-16 btm-nav ${pathName === "/vid" && "vidFooter"}`}>
        {footerItems.map((footerItem) => (
          <div
            className={`flex items-center h-full w-full justify-center ${
              footerItem.path === "/vid" ? "vidIcon" : ""
            }
          `}
            key={footerItem.icon}
          >
            <Link href={footerItem.path}>
              <Image
                width={25}
                height={25}
                src={footerItem.icon}
                alt={footerItem?.label}
              />
              {/* {isSidebar && footerItem.label} */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
