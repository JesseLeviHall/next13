import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: searchParams.page ? +searchParams.page : 1 });
  console.log(searchParams);
  return (
    <>
      {result?.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId!}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          answers={question.answers}
          views={question.views}
          createdAt={question.createdAt}
        />
      ))}
      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result?.isNextQuestions!} />
    </>
  );
};

export default QuestionTab;
