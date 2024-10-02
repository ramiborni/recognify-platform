import React from "react";
import { ArrowRight, AwardIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarCircles from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const RecognitionCard = () => {
  const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
  ];

  const badges = [
    {
      id: 1,
      name: "Star Performer",
      emoji: "⭐",
      color: "bg-yellow-100 dark:bg-yellow-400 hover:bg-yellow-100",
    },
    {
      id: 2,
      name: "Outstanding Achievement",
      emoji: "🏆",
      color: "bg-amber-100 dark:bg-amber-300 hover:bg-amber-100",
    },
    {
      id: 3,
      name: "Great Teamwork",
      emoji: "🤝",
      color: "bg-blue-100 dark:bg-blue-400 hover:bg-blue-100",
    },
    {
      id: 4,
      name: "Innovative Thinker",
      emoji: "💡",
      color: "bg-purple-100 dark:bg-purple-300 hover:bg-purple-100",
    },
    {
      id: 5,
      name: "Customer Favorite",
      emoji: "😍",
      color: "bg-pink-100 dark:bg-pink-300 hover:bg-pink-100",
    },
  ];

  return (
    <>
      <Card className="rounded-lg border animate-in fade-in-100">
        <CardTitle className="px-6 py-4">
          <div className="flex flex-row items-center gap-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="bg-primary/20">
              <div className="m-auto flex w-full flex-col items-center text-xs text-primary">
                <AwardIcon className="size-4" />
                100
              </div>
            </Avatar>
            <ArrowRight className="text-primary" />
            <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
          </div>
          <div className="mt-2 text-sm font-normal text-muted-foreground">
            Before 23 hours
          </div>
        </CardTitle>
        <CardContent className="flex flex-col gap-y-4">
          <div className="text-lg">
            +100 to John, Wick, and Sam for{" "}
            <span className="text-primary">#deliveringexcellence</span>, I
            wanted to reiterate how grateful I am for all the good work and the
            brainstorming session we had and all of your support so far.
          </div>
          <div>
            <Image width="400" height="400" className="aspect-auto rounded-lg" alt="recognition" src="https://media1.giphy.com/media/zc2wFEM5VXIPfaxqOH/giphy.gif?cid=6c09b9525y4h75nvmsy2rmf9w8qxlg2draqq5pocgsvhcdkm&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"/>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap justify-start gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.id} // Ensure you provide a unique key for each badge
                className={`flex-none ${badge.color} text-black`}
              >
                {badge.emoji} {badge.name}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecognitionCard;
