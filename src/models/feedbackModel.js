import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  dislikedThing: {
    type: String,
  },
  likedThing: {
    type: String,
  },
  overallRating: {
    type: String,
  },
  demandedThing: {
    type: String,
  },
  somethingElse: {
    type: String,
  },
  givenBy: {
    type: String,
  },
});

const Feedback =
  mongoose.models.feedbacks || mongoose.model("feedbacks", feedbackSchema);

export default Feedback;
