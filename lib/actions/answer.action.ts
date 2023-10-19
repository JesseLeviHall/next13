"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase();

    const { author, question, content, path } = params;
    const newAnswer = new Answer({
      author,
      question,
      content,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase();
    const { questionId } = params;
    console.log(questionId, "questionId");
    const answers = await Answer.find({ question: questionId })
      .populate({ path: "author", model: User, select: "_id clerkId name picture" })
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
  }
};
