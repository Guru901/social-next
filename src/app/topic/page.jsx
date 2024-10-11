"use client";

import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Topics = () => {
  const {
    isLoading,
    data: topics,
    isError,
  } = useQuery({
    queryKey: ["get-topics"],
    queryFn: async () => {
      const { data } = await axios.post("/api/topics/getTopics");
      return data;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-3">
      <Nav />
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
