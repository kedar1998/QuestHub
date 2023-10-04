"use server";

import User from "@/database/user.model";
import { ConnectToDatabase } from "../mongoose";

export async function getUserById(params) {
  try {
    ConnectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
