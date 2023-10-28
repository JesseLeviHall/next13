/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getTopIneractedTags } from "@/lib/actions/tag.actions";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    username: string;
    name: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopIneractedTags({ userId: user._id });

  return (
    <Link href={`/profile/${user.clerkId}`} className="shadow-ligh100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="background-light900_dark200 right-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image src={user.picture} alt="profile picture" width={100} height={100} className="rounded-full" />
        <div className="mt-4 text-center">
          <h3 className="h-3-bold text-200_light900 line-clamp-1">
            <p className="body-regular text-dark500_light500 mt-2">@{user.username}</p>
          </h3>
        </div>
        <div className="mt-5 flex w-full flex-col items-center px-3 ">
          {
            // @ts-ignore
            interactedTags.length > 0 ? (
              <div className=" flex items-center gap-2 px-2">
                {
                  // @ts-ignore
                  interactedTags.map((tag) => (
                    <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                  ))
                }
              </div>
            ) : (
              <Badge className="border border-blue-600 text-blue-300">No Tags Yet</Badge>
            )
          }
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
