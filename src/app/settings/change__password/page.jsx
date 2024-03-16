"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/navigation";
import Nav from "@/Components/Nav";

const ChangePassword = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [form, setForm] = useState();
  const [error, setError] = useState("");

  const router = useRouter();

  const pswdCheck = () => {
    if (form.newPassword !== form.confPassword) {
      setError("Passwords dont match");
      if (form.newPassword.length < 5) {
        setError("Password Should atleat be of 6 characters");
        return false;
      }
    } else return true;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/me");
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pswdCheck()) {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/user/editProfile", {
          avatar: avatar,
          oldPass: form.currPassword,
          newPass: form.newPassword,
        });

        if (data.success) {
          router.push("/profile");
          setLoading(false);
        } else {
          setError(data.msg);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <Nav />
      <div className="py-6">
        <div className="max-w-screen flex items-center justify-center flex-col gap-2">
          <div className="w-52 h-52 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="object-cover"
              src={avatar ? avatar : user?.avatar}
              alt={user?.username}
            />
          </div>
          <div className="min-w-full flex justify-center flex-col items-center gap-2">
            <div className="flex flex-col justify-center items-center gap-12">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="flex gap-2">
                  <h1 className="text-xl">Username</h1>
                  <h1 className="font-bold text-xl">{`- ${user?.username}`}</h1>
                </div>
                <div className="flex gap-2">
                  <h1 className="text-xl">Role</h1>
                  <h1 className="font-bold text-xl">
                    {`- ${
                      user?.username === "Phoenix"
                        ? "Chhotu"
                        : user.isAdmin
                        ? "Admin"
                        : "User"
                    }`}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <h1>Change your password</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="password"
                    className="input input-bordered w-80"
                    placeholder="Current Password"
                    name="currPassword"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className="input input-bordered w-80"
                    placeholder="New Password"
                    name="newPassword"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className="input input-bordered w-80"
                    placeholder="Confirm New Password"
                    name="confPassword"
                    onChange={handleChange}
                  />
                  <p className="text-sm">{error}</p>
                  <input type="submit" className="btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
