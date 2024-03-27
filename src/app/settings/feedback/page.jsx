"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Feedback = () => {
  const router = useRouter();

  const [form, setForm] = useState({});
  const [user, setUser] = useState();
  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.post("/api/user/me");

      setUser(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setForm({
        ...form,
        user: user.username,
      });

      const { data } = await axios.post("/api/user/feedback", form);
      console.log(data);
      router.push("/settings");

    } catch (error) {
      console.log(error);
    }
  };

  const FeedbackItems = [
    {
      label: "What do you dislike about this app",
      name: "dislikedThing",
    },
    {
      label: "What do you like about this app",
      name: "likedThing",
    },
    {
      label: "What is the feature(s) you want in this app",
      name: "demandedThing",
    },
    {
      label: "Something Else?",
      name: "somethingElse",
    },
  ];

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Rate The App</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        {FeedbackItems.map((feedbackItem) => (
          <label className="form-control" key={feedbackItem.label}>
            <div className="label">
              <span className="label-text">{feedbackItem.label}</span>
            </div>
            <textarea
              name={feedbackItem.name}
              className="textarea textarea-bordered h-24"
              onChange={handleChange}
            ></textarea>
          </label>
        ))}
        <div>
          <div className="label">
            <span className="label-text">What is your overall rating?</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="overallRating"
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

export default Feedback;
