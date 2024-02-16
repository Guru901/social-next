"use client";

import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Function to shuffle the array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// ... (previous imports and functions)

const Vid = () => {
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchVid = async () => {
      setLoading(true);
      const { data } = await axios.post("/api/videos/getVideos");
      setVideos(shuffleArray(data));
      setLoading(false);
    };

    fetchVid();
  }, []);

  const handleTimeUpdate = (event) => {
    const video = event.target;
    // Check if the video is close to the end (e.g., last 2 seconds)
    if (video.duration - video.currentTime < 2) {
      // Update the currentVideoIndex to the next one or loop to the beginning if it's the last video
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

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
            {videos.map((x, index) => (
              <div
                key={x._id}
                className={`carousel-item h-full ${
                  index === currentVideoIndex ? "active" : ""
                }`}
              >
                <video
                  className="w-[100vw] h-[92vh] object-cover"
                  src={x.vid}
                  loop
                  controls
                  onTimeUpdate={handleTimeUpdate}
                ></video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vid;
