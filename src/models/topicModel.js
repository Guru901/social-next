import mongoose from "mongoose";

const topicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

const Topic = mongoose.models.topics || mongoose.model("topics", topicSchema);

export default Topic;
