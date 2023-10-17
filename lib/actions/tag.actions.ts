"use server";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
// import Tag from "@/database/tag.model";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared";
import User from "@/database/user.model";

export const getTopIneractedTags = async (params: GetTopInteractedTagsParams) => {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // TODO: Iteractions
    console.log(limit);
    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
  }
};
