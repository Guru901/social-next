"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";

const AllFriends = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setloading] = useState(true);
  const [friends, setFriends] = useState([]);
  const getLoggedInUser = async () => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/user/me");
      setLoggedInUser(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const getAllFriends = async () => {
    try {
      setloading(true);
      const { data } = await axios.post("/api/user/getFriends", {
        loggedInUser: loggedInUser?._id,
      });
      setFriends(data);
      console.log(data);

      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  useEffect(() => {
    getAllFriends();
  }, [loggedInUser]);

  if (loading) return <Spinner />;
  return (
    <div>
      {Array.isArray(friends) && friends.length > 0
        ? friends.map((friend) => (
            <div className="border">
              {friend.avatar ? (
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={friend.avatar} />
                  </div>
                </div>
              ) : (
                <div className="w-24 rounded-full h-24 bg-white"></div>
              )}
              <h1 key={friend._id}>{friend.username}</h1>
            </div>
          ))
        : "No friends to display"}
    </div>
  );
};

export default AllFriends;
