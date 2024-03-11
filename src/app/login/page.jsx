"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";
import Spinner from "@/Components/Spinner";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const { setLogin } = useContext(UserContext);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", form);

      if (response.data.success) {
        router.push("/profile");
        setUser(response.data.user);
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

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] justify-around items-center px-5">
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
            required
          />

          <input
            type="password"
            placeholder="Enter Your Password.."
            name="password"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
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
    </div>
  );
};

export default Login;
