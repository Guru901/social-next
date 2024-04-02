"use client";

import Nav from "@/Components/Nav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Topics = () => {
  const [topics, setTopics] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);
  const getTopics = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/topics/getTopics");
      setTopics(data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setLoggedInUser(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics();
    getLoggedInUser();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Nav username={loggedInUser?.username} avatar={loggedInUser?.avatar} />
      <div className="flex flex-wrap gap-2 justify-center">
        {topics?.map((topic) => (
          <Link href={`/topic/${topic.name.toLowerCase()}`}>
            <div className="card w-[45vw] max-w-48 bg-base-100 shadow-xl image-full ">
              <div className="card-body friendCard">
                <h2 className="card-title w-full h-full flex items-end justify-center text-xl sm:text-3xl">
                  {topic.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;
