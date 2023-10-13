import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("Mongo URI not found");
  }
  if (isConnected) {
    return console.log("mongo already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = true;
    console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
};
