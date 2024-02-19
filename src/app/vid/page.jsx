"use client";

import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";

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
        className="w-[100vw] max-w-[500px] h-[90vh] object-cover"
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

  const getVideos = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/videos/getVideos");
      const vids = data.map((x) => x.vid);
      setVideos(shuffleArray(vids)); // Set the videos state
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
            video.currentTime = 0; // Reset video to start
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
        threshold: 0.5, // Adjust based on when you want the video to play
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
      <div className="w-[100vw] h-[90vh]">
        <div className="vidNav flex justify-between px-5 items-center w-[100vw] fixed top-0 left-0 z-50">
          <Link href={"/feed"}>
            <button>
              <FaArrowLeft size={24} />
            </button>
          </Link>
          <button className="btn px-4">Logout</button>
        </div>
        <div>
          <div className="h-[92vh] carousel carousel-vertical box">
            {videos?.map((videoSrc, index) => (
              <div key={index} className="carousel-item h-full">
                <VideoItem src={videoSrc} controls={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vid;
