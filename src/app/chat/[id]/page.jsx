"use client";

import Nav from "@/Components/Nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { usePathname } from "next/navigation";

const Chat = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [anotherUser, setAnotherUser] = useState();
  const [chats, setChats] = useState();
  const pathName = usePathname();

  const sentTo = pathName.split("/")[2];

  const postMessage = async () => {
    const { data } = await axios.post("/api/dm/post", {
      msg,
      sentTo,
      sentBy: user._id,
    });
  };

  const getAnotherUser = async () => {
    const { data } = await axios.post("/api/user/getUser", {
      id: sentTo,
    });
    setAnotherUser(data);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/user/me");
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getUser();
    getAnotherUser();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/dm/getMessage", {
          sentTo: sentTo,
          sentBy: user?._id,
        });
        setLoading(false);
        setChats(data);
      } catch (error) {
        setLoading(false);
      }
    };
    getMessages();
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return error;

  return (
    <div>
      <Nav />
      <div className="flex items-center gap-4 p-3">
        {anotherUser?.avatar ? (
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={anotherUser?.avatar}
              alt=""
              className="w-full h-full object-cover "
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full  bg-white"></div>
        )}
        <h1>{anotherUser?.username}</h1>
      </div>
      {/* jisse chat kar rhe hai uska username */}

      <div className="h-screen">
        {chats?.map((chat) => (
          <>
            <div
              key={chat.id}
              className={`chat  ${
                chat?.sentBy === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">{chat.message}</div>
            </div>
          </>
        ))}
      </div>
      <div className="flex w-screen fixed bottom-[4.5rem] left-0">
        <input
          type="text"
          className="input input-bordered w-[72%]"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="btn w-[28%]" onClick={postMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
