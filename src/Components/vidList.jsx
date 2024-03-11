"use client";
// components/VideoList.js
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const VideoList = ({ videoUrls }) => {
  const router = useRouter();

  const videoRefs = videoUrls.map(() => useRef());
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const index = videoRefs.findIndex(
        (ref) => ref.current === inViewRef.current
      );
      if (index !== -1) {
        const videoId = index + 1;
        router.push(`/vid/${videoId}`);
      }
    }
  }, [inView, inViewRef, router]);

  return (
    <div>
      {videoUrls.map((videoUrl, index) => (
        <div key={index} ref={index === 0 ? inViewRef : undefined}>
          <video ref={videoRefs[index]} controls width="300" height="200">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
