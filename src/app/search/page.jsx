"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/Components/Nav";
import Link from "next/link";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const controller = new AbortController();

  const findUser = async () => {
    try {
      const { data } = await axios.post(
        "/api/user/findUser",
        {
          user: search,
        },
        {
          signal: controller.signal,
        }
      );

      setUsers(data.users);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled: ", error.message);
        return;
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    findUser();

    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Nav username={""} />
      <div className="max-w-96 flex flex-col items-center py-5 gap-2">
        <h1 className="w-full flex self-start text-xl">Search</h1>
        <div className="w-screen flex justify-center mt-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-96"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          {users.map((user) => (
            <div className="card w-full bg-base-100 shadow-xl" key={user._id}>
              <Link href={`/user/${user._id}`}>
                <div className="card-body flex flex-row p-4 gap-8">
                  {user.avatar ? (
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-white"></div>
                  )}

                  <div className="card-title">{user.username}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
