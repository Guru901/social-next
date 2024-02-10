"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Upload = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState();

  const router = useRouter();

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/post/upload", {
        title: form.title,
        body: form.body,
        image: image,
        isPublic: true,
        user: user?._id,
        username: user?.username,
      });

      if (data.success) {
        router.push("/feed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center py-14 px-0 gap-8">
        <h1 className="text-xl">Share Your Memories</h1>
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
                  <div className=" file-input file-input-bordered w-[93svw] h-[2rem]">
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
          <button className="btn max-w-lg w-full" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
