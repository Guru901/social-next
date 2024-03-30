import Nav from "@/Components/Nav";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Nav username={"Admin"} />
      <Link href="/admin/dashboard/posts">
        <h1>Posts</h1>
      </Link>
      <Link href="/admin/dashboard/users">
        <h1>Users</h1>
      </Link>
    </div>
  );
};

export default Dashboard;
