import mongoose from "mongoose";

export const connect = async () => {
  try {
    let connection;
    if (!connection) {
      connection = await mongoose.connect(process.env.MONGO_URI);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
