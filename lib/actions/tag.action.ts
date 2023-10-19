/* eslint-disable no-unused-vars */
"use server";

import User from "@/database/user.model";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import { ConnectToDatabase } from "../mongoose";
import Tag, { ITag } from "@/database/tags.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

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

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    ConnectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne({ tagFilter }).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $option: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.question;

    return { tagTitle: tag.name, questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
