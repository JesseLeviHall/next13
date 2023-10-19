import { AnswerFilters } from "@/constants/filters";
import React from "react";
import Filter from "./Filter";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({ questionId, userId, totalAnswers }: Props) => {
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div></div>
    </div>
  );
};

export default AllAnswers;
