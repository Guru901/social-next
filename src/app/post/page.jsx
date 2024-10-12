"use client";

import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "@/Components/Spinner";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Nav from "@/Components/Nav";
import { useUserStore } from "@/store/userStore";
import { emojiSvg } from "./emojiSVG";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Upload = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [picker, setPicker] = useState();
  const [topics, setTopics] = useState();
  const [topic, setTopic] = useState("general");

  const { user } = useUserStore();

  const pickerRef = useRef();

  const router = useRouter();

  const getTopics = async () => {
    try {
      const { data } = await axios.post("/api/topics/getTopics");
      setTopics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: async () => {
      const response = await axios.post("/api/post/upload", {
        title: form.title,
        body: form.body,
        image: image,
        isPublic: isPublic,
        user: user?._id,
        username: user?.username,
        topic: topic,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/feed?from=post");
      }
    },
    onError: (error) => {
      console.error("Error uploading post:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutation.mutate();
    } catch (error) {
      console.log(error);
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
    getTopics();
  }, []);

  return (
    <div>
      <Nav username={user?.username} avatar={user?.avatar} />
      <div className="w-screen max h-screen flex flex-col items-center py-14 px-0 gap-8">
        <h1 className="text-xl text-center">Share Your Memories</h1>
        <div className="join w-11/12  flex max-w-lg "></div>
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
          <div className="w-full flex justify-center items-center">
            <select
              className="select select-bordered w-full max-w-lg"
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value={"general"}>Global</option>
              {topics?.map((topic) => (
                <option key={topic.name} value={topic.name.toLowerCase()}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn max-w-lg w-full"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
