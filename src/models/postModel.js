import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
  userLiked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userDisLiked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isPublic:{
    type:Boolean,
    default:true
  }
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
