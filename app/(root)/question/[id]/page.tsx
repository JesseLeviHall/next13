import { getQuestionById } from "@/lib/actions/question.action";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Metric from "@/components/shared/Metric";
import { abbreviateNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Answer from "@/components/cards/forms/Answer";

const Page = async ({ params }: any) => {
  const result = await getQuestionById({ questionId: params.id });
  console.log(result);
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${result?.question.author.clerkId}`} className="flex items-center justify-start gap-1">
            <Image
              src={result?.question.author.picture}
              alt="author picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">{result?.question.author.name}</p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{result?.question.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result?.question.createdAt)}`}
          title=" "
          textStyels="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={abbreviateNumber(result?.question.answers.length)}
          title=" Answers"
          textStyels="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={abbreviateNumber(result?.question.views)}
          title=" Views"
          textStyels="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result?.question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {result?.question.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <Answer />
    </>
  );
};

export default Page;
