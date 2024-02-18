"use client";

import React, { useEffect, useRef, useState } from "react";

const VideoItem = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.currentTime = 0; // Reset video to start
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // Adjust based on when you want the video to play
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [src]);

  return (
    <video
      className="w-[100vw] h-[90vh] object-cover"
      src={src}
      ref={videoRef}
      loop
    ></video>
  );
};

const Vid = () => {
  const [videos, setVideos] = useState([
    // Assuming you have an array of video sources
    "/vid.mp4",
    "https://res.cloudinary.com/djna5slqw/video/upload/v1708016188/lkomiiiaiqauo3ano8pi.mp4",
    // Add more video sources as needed
  ]);

  return (
    <div className="h-[90vh] carousel carousel-vertical box">
      {videos.map((videoSrc, index) => (
        <div key={index} className="carousel-item h-full">
          <VideoItem src={videoSrc} />
        </div>
      ))}
    </div>
  );
};

export default Vid;
