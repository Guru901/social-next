// "use client";

// import { FaArrowLeft } from "react-icons/fa6";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { gsap } from "gsap";
// import { useRouter } from "next/navigation";
// import { ScrollTrigger } from "gsap/all";

// const Vid = () => {
//   const videoRef = useRef(null);
//   const pathName = usePathname();
//   const vidID = pathName.split("/")[2];
//   const router = useRouter();

//   const [video, setVideo] = useState();
//   const [secVid, setSecVid] = useState();

//   gsap.registerPlugin(ScrollTrigger);

//   useEffect(() => {
//     const fetchVid = async () => {
//       const { data } = await axios.post("/api/videos/getVideos", {
//         id: vidID,
//       });

//       setVideo(data.vid);
//     };
//     fetchVid();
//   }, [vidID]);

//   const fetchVidSec = async () => {
//     const { data } = await axios.post("/api/videos/getVideos", {
//       id: "65ce6f9a8b56e439f1e85018",
//     });

//     setSecVid(data.vid);
//   };

//   useEffect(() => {
//     // Create a ScrollTrigger for the video element
//     // const trigger = ScrollTrigger.create({
//     //   trigger: videoRef.current,
//     //   start: "10% top", // Adjust the starting point based on your needs
//     //   end: "bottom 80%", // Adjust the ending point based on your needs
//     //   markers: true,
//     //   onEnter: () => {
//     //     // Make an API request when scrolling starts
//     //     fetchVidSec();
//     //   },
//     // });

//     window.addEventListener("scroll", () => {
//       fetchVidSec();
//     });
//   }, []);

//   return (
//     <div>
//       <div className="w-[100vw] h-[90vh]">
//         <div className="vidNav flex justify-between px-5 items-center w-[100vw] fixed top-0 left-0">
//           <Link href={"/feed"}>
//             <button>
//               <FaArrowLeft size={24} />
//             </button>
//           </Link>
//           <button className="btn px-4">Logout</button>
//         </div>
//         <div>
//           <div className="h-[90vh] carousel carousel-vertical box">
//             <div className="carousel-item h-full">
//               <video
//                 className="w-[100vw] h-[90vh] object-cover"
//                 src={video}
//                 ref={videoRef}
//                 autoPlay
//                 loop
//               ></video>
//             </div>
//             <div className="carousel-item h-full">
//               <video
//                 className="w-[100vw] h-[90vh] object-cover"
//                 src={secVid}
//                 autoPlay
//                 loop
//               ></video>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Vid;
