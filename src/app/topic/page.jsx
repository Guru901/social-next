"use client";

import Nav from "@/Components/Nav";
import { connect } from "@/dbconfig/connect";
import Topic from "@/models/topicModel";
import axios from "axios";
import Link from "next/link";

const AllTopics = async () => {
  await connect();
  const { data: topics } = await Topic.find({});

  if (!topics) return <h1>No topics</h1>;

  return (
    <div className="flex flex-col gap-3">
      <Nav />
      <div className="flex flex-wrap gap-2 justify-center">
        {topics?.map((topic) => (
          <Link href={`/topic/${topic.name.toLowerCase()}`} key={topic._id}>
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

export default AllTopics;
