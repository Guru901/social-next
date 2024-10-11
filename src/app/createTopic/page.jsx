"use client";

import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateTopic = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState();

  const router = useRouter();

  const { user } = useUserStore();

  const mutation = useMutation({
    mutationKey: ["create-topic"],
    mutationFn: async (formData) => {
      const response = await axios.post("/api/topics/createTopic", formData);
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/feed");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitTopic = async (e) => {
    function hasWhiteSpace(s) {
      return s.indexOf(" ") >= 0;
    }
    e.preventDefault();
    try {
      if (!hasWhiteSpace(form.title)) {
        form.createdBy = user?.username;
        mutation.mutate(form);
      } else {
        setError("Topic cant contain spaces");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (mutation.isPending) return <Spinner />;

  if (mutation.isError)
    return (
      <div className="flex h-screen w-screen items-center justify-center text-center">
        <h1>
          Some error occurred try again later and if the issue persists contact
          admin
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col h-screen gap-24">
      <Nav />
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
