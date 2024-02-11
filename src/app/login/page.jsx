"use client";

import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [form, setForm] = useState({}); // user's data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const { setLogin } = useContext(UserContext);

  const router = useRouter();

  const handleChange = (e) => {
    // Getting username and password in the form variable to send into backend
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending request to backend for user's registeration
      // Setting the loading to true when the request is send
      setLoading(true);
      const response = await axios.post("/api/user/login", form);

      // if everything's good send the user to /feed

      if (response.data.success) {
        router.push("/feed");
        setUser(response.data.user);
        console.log(response.data.user);
        setLogin(true);
      } else {
        setError(response.data.msg);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] justify-around items-center px-5">
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className='spinner'></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-3xl">Welcome Back</h1>
          </div>
          <form
            className="flex flex-col w-full max-w-sm gap-3"
            onSubmit={handleSubmit}
            encType="mutlipart/form-data"
          >
            <input
              type="text"
              placeholder="Enter Your Username.."
              name="username"
              className="input input-bordered w-full"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Your Password.."
              name="password"
              className="input input-bordered w-full"
              onChange={handleChange}
            />

            <div className="flex flex-col text-xs gap-1">
              <Link href={"/"} className="underline">
                Learn more
              </Link>
              <Link href={"/"} className="underline">
                Dont have an account?
              </Link>
              <h2 className="text-center text-[#ef4c53]">{error}</h2>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
