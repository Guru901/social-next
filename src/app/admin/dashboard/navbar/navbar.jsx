"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();

  const title = pathName.split("/")[2];

  return (
    <div className="w-full m-1 bg-neutral h-min py-6 rounded-md">
      <div>
        <h1 className="capitalize text-2xl font-bold pl-2">{title}</h1>
      </div>
    </div>
  );
};

export default Navbar;
