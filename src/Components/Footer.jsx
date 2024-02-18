"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();

  return (
    <div
      className={`footerContainer ${
        pathName === "/login"
          ? "hidden"
          : "" || pathName === "/"
          ? "hidden"
          : "" || pathName === `/vid`
          ? "vid"
          : ""
      }`}
    >
      <div className="f mt-16">
        <div className="h-full flex justify-center items-center">
          <Link href={"/feed"}>
            <button
              className={`footerbtn ${pathName === "/feed" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center">
          <Link href={"/vid"}>
            <button className="footerbtn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8234 9.45566L8.13233 5.00233C6.54012 4.18648 4.66675 5.373 4.66675 7.1973V15.6162C4.66675 17.4405 6.54012 18.627 8.13233 17.8112L16.8234 13.3578C18.3923 12.5539 18.3923 10.2596 16.8234 9.45566Z"
                  fill="#A6ADBB"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center">
          <Link href={"/post"}>
            <button
              className={`footerbtn ${pathName === "/post" ? "active" : ""} `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="22"
                width="22"
                stroke="currentColor"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center">
          <Link href={"/search"}>
            <button className="footerbtn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <path
                  d="M18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11Z"
                  fill="none"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center">
          <Link href={"/profile"}>
            <button
              className={`footerbtn ${pathName === "/profile" ? "active" : ""}`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3763 16.1711C16.837 16.0751 17.1114 15.5931 16.8825 15.1819C16.3778 14.2755 15.5828 13.4791 14.5658 12.8721C13.2559 12.0904 11.6511 11.6667 10.0001 11.6667C8.34905 11.6667 6.74418 12.0904 5.43435 12.8721C4.41732 13.4791 3.6223 14.2755 3.11765 15.1819C2.88873 15.5931 3.1631 16.0751 3.62378 16.1711V16.1711C7.82945 17.0476 12.1707 17.0476 16.3763 16.1711V16.1711Z"
                  fill="#A6ADBB"
                />
                <circle cx="9.99992" cy="6.66667" r="4.16667" fill="#A6ADBB" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
