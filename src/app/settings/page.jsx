import React from "react";
import Nav from "../../Components/Nav";
import { FaBell, FaFeather, FaGears, FaUser } from "react-icons/fa6";
import Link from "next/link";

const Settings = () => {
  return (
    <div>
      <Nav />
      <div className="settings flex gap-2 flex-col">
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/profile">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaUser />
              </div>
              <div className="mt-1">Edit Profile</div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/account">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaGears />
              </div>
              <div>Account</div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/profile">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaBell />
              </div>
              <div>Notifications</div>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaFeather />
              </div>
              <div>Give Feedback</div>
              <p>ni diya to bhoot le jaayenge</p>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaFeather />
              </div>
              <div>Give Feedback</div>
              <p>ni diya to bhoot le jaayenge</p>
            </div>
          </Link>
        </div>
        <div className="setting flex flex-row p-4 gap-8">
          <Link href="/settings/feature">
            <div className="card-title flex justify-start items-center gap-4 cursor-pointer">
              <div>
                <FaFeather />
              </div>
              <div>Give Feedback</div>
              <p>ni diya to bhoot le jaayenge</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
