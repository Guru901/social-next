import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: String,

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    isFriendsWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
