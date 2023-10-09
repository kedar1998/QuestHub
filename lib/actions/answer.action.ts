"use server";

import Answer from "@/database/answer.model";
import { ConnectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import console from "console";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    ConnectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answer: newAnswer._id },
    });

    revalidatePath(path);

    return newAnswer;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    ConnectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
