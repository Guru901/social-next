import mongoose from "mongoose";

const dmSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const DM = mongoose.models.DM || mongoose.model("DM", dmSchema);

export default DM;
