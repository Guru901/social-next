"use client";

import React from "react";

const VidPlayer = ({ videoUrl, autoPlay, className }) => {
  return (
    <div className={`${className} flex w-screen justify-center`}>
      <video
        src={videoUrl}
        controls={true}
        width="365"
        height="90%"
        autoPlay={autoPlay}
      ></video>
    </div>
  );
};

export default VidPlayer;
