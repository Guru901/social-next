"use client";

import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateTopic = () => {
  const [form, setForm] = useState({});
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const router = useRouter();

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

  const submitTopic = async (e) => {
    function hasWhiteSpace(s) {
      return s.indexOf(" ") >= 0;
    }
    e.preventDefault();
    try {
      if (!hasWhiteSpace(form.title)) {
        setLoading(true);
        const { data } = await axios.post("/api/topics/createTopic", {
          topic: form.title,
          createdBy: loggedInUser.username,
        });
        router.push("/feed");
        setLoading(false);
      } else {
        setError("Topic cant contain spaces");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col h-screen gap-24">
      <Nav username={loggedInUser?.username} avatar={loggedInUser?.avatar} />
      <div>
        <h1 className="text-[currentColor] text-3xl text-center">
          Create A Custom Topic!!
        </h1>
      </div>
      <form
        className="flex flex-col gap-2 px-4 justify-center items-center"
        onSubmit={submitTopic}
      >
        <input
          type="text"
          name="title"
          className="input input-bordered w-[calc(100vw-16px)] max-w-96"
          placeholder="Title of Topic.."
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />

        <p>{error}</p>
        <input type="submit" className="btn w-[calc(100vw-16px)] max-w-96" />
      </form>
    </div>
  );
};

export default CreateTopic;
