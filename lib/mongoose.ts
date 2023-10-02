import mongoose from "mongoose";

let isConnected: boolean = false;

export const ConnectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING DATABASE URL");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "QuestHub",
    });

    isConnected = true;
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
  }
};
