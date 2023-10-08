"use server";

import User from "@/database/user.model";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import { ConnectToDatabase } from "../mongoose";
import Tag from "@/database/tags.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  const { userId } = params;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  //   Find Interactions for user and group by tag

  //   Temp data
  return [
    { name: "tag1", _id: "1" },
    { name: "tag2", _id: "2" },
    { name: "tag3", _id: "3" },
  ];
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    ConnectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
