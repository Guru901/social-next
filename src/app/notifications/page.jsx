import React from "react";
import AllNotifications from "./allNotifications";
import Notifications from "@/models/notificationModel";
import { connect } from "@/dbconfig/connect";
import getLoggedInUser from "@/functions/me";

const AllNotificationsWrapper = async () => {
  await connect();

  const user = await getLoggedInUser();

  const notifications = await Notifications.find({
    to: user?._id,
    isAccepted: false,
  });

  if (!notifications) return;

  return (
    <div>
      <AllNotifications notifications={notifications} />
    </div>
  );
};

export default AllNotificationsWrapper;
