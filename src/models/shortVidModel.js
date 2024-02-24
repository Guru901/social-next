import mongoose from "mongoose";

const vidSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    vid: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    username: {
      type: String,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.models.Videos || mongoose.model("Videos", vidSchema);

export default Videos;
