"use server";

import { connectToDatabase } from "../mongoose";

/* 
export const yourFunctionName = async (params: any) => {
  try {
    // function body
  } catch (error) {
    // error handling
  }
}
*/

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase();
  } catch (error) {
    // error handling
  }
};
