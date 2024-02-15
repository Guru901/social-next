import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
});

const Videos = mongoose.models.Videos || mongoose.model("Videos", postSchema);

export default Videos;
