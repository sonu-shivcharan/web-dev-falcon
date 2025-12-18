import mongoose from "mongoose";

export default async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    if (!MONGODB_URI) {
      throw new Error("Add MONGODB_URI variable to .env");
    }
    const connection = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection success", connection.connections[0].host);
  } catch (error) {
    // console.error("Mongo db connection error: ", error);
    // process.exit(1);
    throw error;
  }
}
