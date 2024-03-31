import React from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";

const Dashboard = () => {
  return (
    <div>
      <div className="flex relative min-h-screen min-w-screen">
        <Sidebar />
        <div className="min-h-screen px-40 h-full"></div>
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;
