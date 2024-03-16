"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "@/Components/Spinner";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Upload = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const [user, setUser] = useState();
  const [picker, setPicker] = useState();

  const pickerRef = useRef();

  const router = useRouter();

  const emojiSvg = (
    <svg
      id="emoji"
      viewBox="0 0 72 72"
      className="w-6 h-6 opacity-70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="color">
        <circle cx="36.0001" cy="36" r="22.9999" fill="currentColor" />
      </g>
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        <circle
          cx="36"
          cy="36"
          r="23"
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M45.8149,44.9293 c-2.8995,1.6362-6.2482,2.5699-9.8149,2.5699s-6.9153-0.9336-9.8149-2.5699"
        />
        <path d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31" />
        <path d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31" />
      </g>
    </svg>
  );

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isPost ? "/api/post/upload" : "/api/videos/upload";

      setLoading(true);
      const { data } = await axios.post(url, {
        title: form.title,
        body: form.body,
        image: image,
        isPublic: isPublic,
        user: user?._id,
        username: user?.username,
      });

      if (data.success) {
        router.push("/feed");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setForm({
      ...form,
      title: `${form.title || ""}${emoji.native}`,
    });
  };

  const selectEmoji = (e) => {
    e.preventDefault();
    setPicker(!picker);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="w-screen max h-screen flex flex-col items-center py-14 px-0 gap-8">
        <h1 className="text-xl text-center">Share Your Memories</h1>
        <div className="join w-11/12  flex max-w-lg ">
          <input
            className="join-item btn w-1/2"
            type="radio"
            name="options"
            aria-label="Post on Feed"
            checked={isPost}
            onChange={() => setIsPost(true)}
          />
          <input
            className="join-item btn w-1/2"
            type="radio"
            name="options"
            aria-label="Post on Short videos"
            checked={!isPost}
            onChange={() => setIsPost(false)}
          />
        </div>
        <form
          className="flex flex-col gap-3 w-11/12 justify-center items-center text-start"
          onSubmit={handleSubmit}
        >
          <label className="relative max-w-lg input input-bordered flex items-center gap-2 w-full">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Title..."
              value={form.title}
              name="title"
              className="w-full max-w-lg bg-transparent"
            />
            <button onClick={selectEmoji}>{emojiSvg}</button>
          </label>
          <div>
            {picker && (
              <div className="absolute right-0" ref={pickerRef}>
                <Picker
                  theme={"dark"}
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>
          <textarea
            onChange={handleChange}
            name="body"
            className="textarea textarea-bordered h-40 max-w-lg w-full"
            placeholder="Body..."
          ></textarea>

          <CldUploadWidget
            uploadPreset="cf72ckgk"
            onSuccess={(results) => {
              setImage(results.info.secure_url);
            }}
          >
            {({ open }) => {
              return (
                <button type="button" onClick={() => open()}>
                  <div className=" file-input file-input-bordered w-[93svw] h-[2rem] max-w-lg">
                    <div className="w-[8rem] bg-[#2A323C] h-full rounded-s-md flex items-center justify-center">
                      <h1 className="font-bold text-sm">CHOOSE FILE</h1>
                    </div>
                    <div className="w-[13rem]  h-full"></div>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>

          <h1 className="w-full max-w-lg">File is optional</h1>

          <div className="w-full flex justify-center items-center">
            <select
              className="select select-bordered w-full max-w-lg"
              onChange={(e) => setIsPublic(e.target.value)}
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          <button className="btn max-w-lg w-full" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
