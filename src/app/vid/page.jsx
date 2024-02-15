"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const shuffleArray = (array) => {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const vid = () => {
  const pathName = usePathname();
  const vidID = pathName.split("/")[2];

  // List of video sources
  const videoSources = shuffleArray([
    "https://vod-progressive.akamaized.net/exp=1708032058~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3408%2F15%2F392040372%2F1660599182.mp4~hmac=2e346bf9a9a8dbde52ad04478b8199188bf48c31bc17b919475f69d5a189a2c0/vimeo-prod-skyfire-std-us/01/3408/15/392040372/1660599182.mp4",
    "https://vod-progressive.akamaized.net/exp=1708032071~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3008%2F18%2F465043531%2F2062443647.mp4~hmac=95c276ffd2dd8f472e1568064ff487831650d2651365e2507d8a3ddeec500239/vimeo-prod-skyfire-std-us/01/3008/18/465043531/2062443647.mp4",
    "https://vod-progressive.akamaized.net/exp=1708032080~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3405%2F15%2F392029339%2F1660536759.mp4~hmac=55ef1439b7f326d24bcc72b3e21fca3e9c5c0c1e205848ec27fcfc8a7be66be0/vimeo-prod-skyfire-std-us/01/3405/15/392029339/1660536759.mp4",
    "https://vod-progressive.akamaized.net/exp=1708032095~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4598%2F18%2F472990884%2F2107572713.mp4~hmac=d46050fd9884b8f46b0e9328460dd7c5bafc5e8a4b4ecfd82c2eaa324c43fab7/vimeo-prod-skyfire-std-us/01/4598/18/472990884/2107572713.mp4",
    "https://res.cloudinary.com/djna5slqw/video/upload/v1708016188/lkomiiiaiqauo3ano8pi.mp4",
  ]);

  return (
    <div>
      <div className="w-[100svw] h-[90vh] ">
        <div className="vidNav flex justify-between px-5 items-center w-[100svw] fixed top-0 left-0">
          <Link href={"/feed"}>
            <button>
              <FaArrowLeft size={24} />
            </button>
          </Link>
          <button className="btn px-4">Logout</button>
        </div>
        <div>
          <div className="h-[90svh] carousel carousel-vertical box">
            <div className="carousel-item h-full">
              <div className="flex h-full w-full justify-center items-center flex-col">
                <h1>Page under Construction</h1>
                <h1>Dont Judge Right Now</h1>
                <h1>Scroll</h1>
              </div>
            </div>
            {videoSources.map((src, index) => (
              <div key={index} className="carousel-item h-full">
                <video
                  className="w-[100svw] h-[90svh] object-cover"
                  src={src}
                  autoPlay
                  loop
                ></video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default vid;
