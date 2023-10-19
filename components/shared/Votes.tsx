"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { downvoteQuestion, upvoteQuestion } from "@/lib/actions/question.action";
import { abbreviateNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  userId: string;
  itemId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({ type, userId, itemId, upvotes, hasupVoted, downvotes, hasdownVoted, hasSaved }: Props) => {
  const pathname = usePathname();
  // const router = useRouter();

  const handleVote = async (action: string) => {
    console.log(action);
    if (!userId) {
      return;
    }
    if (action === "upvote" && type === "Question") {
      await upvoteQuestion({
        questionId: itemId,
        userId: `${userId}`,
        hasdownVoted,
        hasupVoted,
        path: pathname,
      });
    } else if (type === "Answer") {
      await upvoteAnswer({
        answerId: itemId,
        userId: `${userId}`,
        hasdownVoted,
        hasupVoted,
        path: pathname,
      });
    }
    if (action === "downvote" && type === "Question") {
      await downvoteQuestion({
        questionId: itemId,
        userId: `${userId}`,
        hasdownVoted,
        hasupVoted,
        path: pathname,
      });
    } else if (type === "Answer") {
      await downvoteAnswer({
        answerId: itemId,
        userId: `${userId}`,
        hasdownVoted,
        hasupVoted,
        path: pathname,
      });
    }
  };

  const handleSave = async () => {
    console.log("saved ");
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={hasupVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("upvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{abbreviateNumber(upvotes)}</p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={hasdownVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => {
              handleVote("downvote");
            }}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{abbreviateNumber(downvotes)}</p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
          width={18}
          height={18}
          alt="save"
          className="cursor-pointer"
          onClick={() => {
            handleSave();
          }}
        />
      )}
    </div>
  );
};

export default Votes;
