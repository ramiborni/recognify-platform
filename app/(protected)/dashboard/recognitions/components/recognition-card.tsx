import React from "react";
import Image from "next/image";
import { RecognationBadges, Recognition, User } from "@prisma/client";
import { ArrowRight, AwardIcon } from "lucide-react";

import { timeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarCircles from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

interface RecognitionCardProps {
  recognition: Recognition & { receiver: User; giver: User };
}

const RecognitionCard = ({ recognition }: RecognitionCardProps) => {
  const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
  ];

  const badgesData = [
    {
      id: RecognationBadges.STAR_PERFORMER,
      name: "Star Performer",
      icon: "🌟",
      color: "bg-yellow-100 dark:bg-yellow-400 hover:bg-yellow-100",
    },
    {
      id: RecognationBadges.OUTSTANDING_ACHIEVEMENT,
      name: "Outstanding Achievement",
      icon: "🏆",
      color: "bg-amber-100 dark:bg-amber-300 hover:bg-amber-100",
    },
    {
      id: RecognationBadges.GREAT_TEAMWORK,
      name: "Great Teamwork",
      icon: "🤝",
      color: "bg-blue-100 dark:bg-blue-400 hover:bg-blue-100",
    },
    {
      id: RecognationBadges.INNOVATIVE_THINKER,
      name: "Innovative Thinker",
      icon: "💡",
      color: "bg-purple-100 dark:bg-purple-300 hover:bg-purple-100",
    },
    {
      id: RecognationBadges.CUSTOMER_FAVOURITE,
      name: "Customer Favourite",
      icon: "❤️",
      color: "bg-pink-100 dark:bg-pink-300 hover:bg-pink-100",
    },
    {
      id: RecognationBadges.LEADER,
      name: "Leader",
      icon: "👑",
      color: "bg-yellow-300 dark:bg-yellow-500 hover:bg-yellow-400",
    },
  ];

  const RecognitionBadge = ({ badgeId }: { badgeId: string }) => {
    const badge = badgesData.find((b) => b.id === badgeId);

    return (
      <Badge
        key={badge?.id} // Ensure you provide a unique key for each badge
        className={`flex-none ${badge?.color} text-black`}
      >
        {badge?.icon} {badge?.name}
      </Badge>
    );
  };

  return (
    <>
      <Card className="rounded-lg border animate-in fade-in-100">
        <CardTitle className="px-6 py-4">
          <div className="flex flex-row items-center gap-x-3">
            <Avatar>
              <AvatarImage
                src={recognition.giver.profilePicute!}
                alt="Profile Picture"
              />
              <AvatarFallback>
                {recognition.giver.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Avatar className="bg-primary/20">
              <div className="m-auto flex w-full flex-col items-center text-xs text-primary">
                <AwardIcon className="size-4" />
                {recognition.points}
              </div>
            </Avatar>
            <ArrowRight className="text-primary" />
            {/*
              <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
              */}
            <Avatar>
              <AvatarImage
                src={recognition.receiver.profilePicute!}
                alt="Profile Picture"
              />
              <AvatarFallback>
                {recognition.receiver.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-2 text-sm font-normal text-muted-foreground">
            {timeAgo(recognition.createdAt)}
          </div>
        </CardTitle>
        <CardContent className="flex flex-col gap-y-4">
          <div className="text-lg">{recognition.message}</div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap justify-start gap-2">
            {recognition.badges.map((badge) => (
              <RecognitionBadge badgeId={badge} />
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecognitionCard;
