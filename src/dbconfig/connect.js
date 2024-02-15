import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://avinashkaur842:t9Mz1bJq3HgsaVhL@cluster0.6hic2ku.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
