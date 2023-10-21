"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

/* 
this is a template for creating a new action:
export const yourFunctionName = async (params: any) => {
  try {
    connectToDatabase();
    // function body
  } catch (error) {
    console.log(error); 
  }
}
*/

export const createQuestion = async (params: CreateQuestionParams) => {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
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
    revalidatePath(path);
  } catch (error) {
    // error handling
  }
};

export const getQuestions = async (params: GetQuestionsParams) => {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions);
    return { questions };
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connectToDatabase();
    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({ path: "author", model: User, select: "_id clerkId name picture" });
    return { question };
  } catch (error) {
    console.log(error);
  }
};

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
    if (!question) {
      throw new Error("Question not found");
    }
    // increment reputation later
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });
    if (!question) {
      throw new Error("Question not found");
    }
    // increment reputation later
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany({ questions: questionId }, { $pull: { questions: questionId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    connectToDatabase();
    const { questionId, title, content, path } = params;
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
};

export const getHotQuestions = async () => {
  try {
    connectToDatabase();
    const hotQuestions = await Question.find({}).sort({ views: -1, upvotes: -1 }).limit(5);

    return hotQuestions;
  } catch (error) {
    console.log(error);
  }
};
