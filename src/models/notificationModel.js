import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
    index: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fromAvatar: {
    type: String,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});

const Notifications =
  mongoose.models.notifications ||
  mongoose.model("notifications", notificationSchema);

export default Notifications;
