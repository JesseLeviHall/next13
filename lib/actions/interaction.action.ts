"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
// import Tag from "@/database/tag.model";
import { ViewQuestionParams } from "./shared";
// import User from "@/database/user.model";
// import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    connectToDatabase();
    const { questionId, userId } = params;
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({ user: userId, action: "view", question: questionId });
      if (existingInteraction) {
        return console.log("already viewed");
      }
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
