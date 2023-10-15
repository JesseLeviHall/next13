"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

/* 
this is a template for creating a new action:
export const yourFunctionName = async (params: any) => {
  try {
    connectToDatabase();
    // function body
  } catch (error) {
    // error handling
  }
}
*/

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
      path,
    });
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, { $push: { tags: { $each: tagDocuments } } });
  } catch (error) {
    // error handling
  }
};
