"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Spinner from "@/Components/Spinner";

const Upload = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();

  const getUser = async () => {
    const { data } = await axios.post("/api/user/me");
    setUser(data);
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
          <input
            onChange={handleChange}
            type="text"
            placeholder="Title..."
            name="title"
            className="input input-bordered w-full max-w-lg"
          />
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
