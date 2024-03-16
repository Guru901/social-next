"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import Spinner from "@/Components/Spinner";

const Home = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pswd, setPswd] = useState("");
  const [avatar, setAvatar] = useState();

  const router = useRouter();

  const { setLogin } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const pswdCheck = () => {
    if (pswd !== form.password) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (pswdCheck()) {
        const { data } = await axios.post("/api/user/register", {
          username: form.username,
          password: form.password,
          file: avatar,
        });

        if (data.success) {
          router.push("/profile");
          setLogin(true);
          setLoading(false);
        } else {
          setError(data.msg);
          router.push("/");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] justify-evenly items-center px-5">
      <div className="flex justify-between">
        <h1 className="text-3xl">Register</h1>
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
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm Password.."
          name="password"
          className="input input-bordered w-full"
          onChange={(e) => setPswd(e.target.value)}
          required
          minLength={6}
        />
        <CldUploadWidget
          uploadPreset="cf72ckgk"
          onSuccess={(results) => {
            setAvatar(results.info.secure_url);
          }}
        >
          {({ open }) => {
            return (
              <button type="button" onClick={() => open()}>
                Select Avatar
              </button>
            );
          }}
        </CldUploadWidget>
        <div className="flex flex-col text-xs gap-1">
          <h1>Remember you cant ever change the username</h1>
          <Link href={"/"} className="underline">
            Learn more
          </Link>
          <Link href={"/login"} className="underline">
            Already have an account?
          </Link>
          <h2 className="text-center text-[#ef4c53]">{error}</h2>
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
