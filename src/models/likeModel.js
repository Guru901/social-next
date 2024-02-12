import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
);

const SocialLike = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default SocialLike;
