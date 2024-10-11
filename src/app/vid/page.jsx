"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import Nav from "@/Components/Nav";

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const VideoItem = ({ src, controls }) => {
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
    <div className="w-screen h-screen flex justify-center items-start">
      <video
        className="w-[100vw] max-w-[500px] h-[93vh] object-cover"
        src={src}
        ref={videoRef}
        controls={controls}
        loop
      ></video>
    </div>
  );
};

const Vid = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState();
  const [vidData, setVidData] = useState();

  const getVideos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/videos/getVideos");
      const vids = data.map((x) => x.vid);
      setVidData(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = (event) => {
      const video = event.target;
      if (video.duration - video.currentTime < 2) {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = videoRef.current;
            video.currentTime = 0;
            video.play();
            video.addEventListener("timeupdate", handleTimeUpdate);
          } else {
            videoRef.current.pause();
            videoRef.current.removeEventListener(
              "timeupdate",
              handleTimeUpdate
            );
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videos, currentVideoIndex]);

  useEffect(() => {
    getVideos();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="w-[100vw] h-[93vh]">
        <div>
          <div className="h-[93vh] carousel carousel-vertical box">
            {vidData?.map((viddata, index) => (
              <div key={index} className="carousel-item h-full">
                <VideoItem src={viddata.vid} controls={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vid;
