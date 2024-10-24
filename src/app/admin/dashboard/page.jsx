import React from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";
import AllComments from "./comments/page";
import AllPosts from "../posts/page";

const Dashboard = () => {
  return (
    <div>
      <div className="flex relative min-h-screen min-w-screen">
        <Sidebar />
        <div className="min-h-screen px-40 h-full"></div>
        <div className="flex flex-col">
          <Navbar />
          <div className="flex gap-2">
            <AllPosts />
            <AllComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
