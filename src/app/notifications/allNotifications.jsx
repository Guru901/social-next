"use client";

import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useState } from "react";

const AllNotifications = ({ notifications }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("Accept");

  const { user } = useUserStore();

  const acceptNotification = async (notificationType, from, notificationId) => {
    try {
      await axios.post("/api/notifications/accept", {
        notificationType: notificationType,
        to: user?._id,
        from: from,
        notificationId: notificationId,
      });
      setNotificationStatus("Accepted");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Nav />
      <div>
        {notifications?.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div key={notification._id} className="p-2">
                <div className="flex items-center p-2 border-[#A6ADBB] flex-col">
                  <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body py-2 px-2">
                      <div className="flex flex-row-reverse gap-4">
                        <p>{`${notification.from} want to be friends with you`}</p>
                        <div className="w-24 rounded-xl overflow-hidden">
                          <div className="card-actions justify-end">
                            {notification.fromAvatar ? (
                              <img src={notification.fromAvatar} />
                            ) : (
                              <div className="w-24 h-20 rounded-xl overflow-hidden bg-[#A6ADBB]"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          className="btn"
                          disabled={
                            notification.isAccepted ||
                            notificationStatus === "Accepted"
                          }
                          onClick={() => {
                            acceptNotification(
                              notification.notificationType,
                              notification.from,
                              notification._id
                            );
                          }}
                        >
                          {notificationStatus}
                        </button>

                        <button
                          className="btn"
                          disabled={notification.isAccepted}
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-[100svw] h-[80vh] flex items-center justify-center">
            <h1 className="h-min text-2xl">No Notifications</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;
