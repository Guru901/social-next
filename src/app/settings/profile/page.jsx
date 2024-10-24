"use client";

import { useState } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Nav from "@/Components/Nav";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { useUserStore } from "@/store/userStore";

const EditProfile = () => {
  const { user, setUser } = useUserStore();

  const [loading, setLoading] = useState();
  const [avatar, setAvatar] = useState("");

  const router = useRouter();

  const handleAvatarChange = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/editAvatar", {
        avatar,
      });

      if (data.success) {
        setUser({
          ...user,
          avatar,
        });
        router.push("/profile");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Nav username={user?.username} avatar={user?.avatar} />
      <div className="py-6">
        <div className="max-w-screen flex items-center justify-center flex-col gap-2">
          {user?.avatar ? (
            <div className="w-52 h-52 rounded-full overflow-hidden flex justify-center items-center">
              <Image
                width={208}
                height={208}
                className="object-cover"
                src={avatar ? avatar : user?.avatar}
                alt={user?.username}
              />
            </div>
          ) : (
            <div className="w-52 h-52 rounded-full overflow-hidden flex justify-center items-center">
              <FaUser size={100} />
            </div>
          )}
          <div className="min-w-full flex justify-center flex-col items-center gap-2">
            <div className="flex gap-12">
              <CldUploadWidget
                uploadPreset="cf72ckgk"
                onSuccess={(results) => {
                  setAvatar(results.info.secure_url);
                }}
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="underline"
                    >
                      Change avatar
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
            <div className="flex flex-col justify-center items-center gap-12">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="flex gap-2">
                  <h1 className="text-xl">Username</h1>
                  <h1 className="font-bold text-xl">{`- ${user?.username}`}</h1>
                </div>
                <div className="flex gap-2">
                  <h1 className="text-xl">Role</h1>
                  <h1 className="font-bold text-xl">
                    {`- ${user?.username === "Phoenix" ? "Chhotu" : "User"}`}
                  </h1>
                </div>
                <button className="btn" onClick={handleAvatarChange}>
                  Confirm Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
