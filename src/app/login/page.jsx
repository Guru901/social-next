"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const { setUser, setLogin } = useUserStore();

  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData) => {
      const response = await axios.post("/api/user/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/profile");
        setUser(data.user);
        setLogin(true);
      } else {
        setError(data.msg);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      mutation.mutate(form);
    } catch (error) {
      console.log(error);
    }
  };

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
          <button type="submit" className="btn" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </>
    </div>
  );
};

export default Login;
