"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recordClap, removeClap } from "@/actions/api/recognitions";
import { Clap, RecognationBadges, Recognition, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, AwardIcon, Mail } from "lucide-react";

import { timeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

interface RecognitionCardProps {
  recognition: Recognition & {
    receiver: User & { recognitionsReceived: Recognition[] };
    giver: User & { recognitionsReceived: Recognition[] };
    claps: Clap[];
  };
  currentUserId: string;
}

const RecognitionCard = ({
  recognition,
  currentUserId,
}: RecognitionCardProps) => {
  const [claps, setClaps] = useState(recognition.claps.length);
  const [hasClapped, setHasClapped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const clapMutation = useMutation({
    mutationFn: async () => {
      if (hasClapped) {
        await removeClap(recognition.id);
      } else {
        await recordClap(recognition.id);
      }
    },
    onMutate: () => {
      setClaps((prevClaps) => (hasClapped ? prevClaps - 1 : prevClaps + 1));
      if (!hasClapped) {
        setIsAnimating(true);
      }
    },
    onSuccess: () => {
      setHasClapped((prev) => !prev);
      router.refresh();
    },
    onError: (error) => {
      setClaps((prevClaps) => (hasClapped ? prevClaps + 1 : prevClaps - 1));
      toast({
        title: "Error",
        description: "Failed to update clap. Please try again.",
        variant: "destructive",
      });
    },
  });

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
      <Badge key={badge?.id} className={`flex-none ${badge?.color} text-black`}>
        {badge?.icon} {badge?.name}
      </Badge>
    );
  };

  const calculateTotalPoints = (
    user: User & { recognitionsReceived: Recognition[] },
  ) => {
    return user.recognitionsReceived.reduce(
      (acc, recognition) => acc + recognition.points,
      0,
    );
  };

  const UserHoverCard = ({
    user,
  }: {
    user: User & { recognitionsReceived: Recognition[] };
  }) => {
    const totalPoints = calculateTotalPoints(user);

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user.profilePicture!}
              alt={`${user.name}'s profile picture`}
            />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profilePicture!} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <div className="flex items-center space-x-2">
                <Badge className="h-6" variant="default">
                  <AwardIcon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium">
                    {totalPoints} points
                  </span>
                </Badge>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  const handleClap = () => {
    clapMutation.mutate();
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  useEffect(() => {
    const userHasClapped = recognition.claps.some(
      (clap) => clap.userId === currentUserId,
    );
    setHasClapped(userHasClapped);
    setClaps(recognition.claps.length);
  }, [recognition.claps, currentUserId]);

  return (
    <Card className="rounded-lg border">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserHoverCard user={recognition.giver} />
            <ArrowRight className="h-5 w-5 text-primary" />
            <UserHoverCard user={recognition.receiver} />
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-primary">
            <Badge className="h-6" variant="default">
              <AwardIcon className="h-4 w-4" />
              <span>{recognition.points} points</span>
            </Badge>
          </div>
        </div>
        <div className="mt-2 text-sm font-normal text-muted-foreground">
          {timeAgo(recognition.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-lg font-medium leading-relaxed">
          {recognition.message}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {recognition.badges.map((badge) => (
            <RecognitionBadge key={badge} badgeId={badge} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 py-4">
        <button
          onClick={handleClap}
          disabled={clapMutation.isPending}
          className={`group flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            hasClapped
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
          aria-label={`${hasClapped ? "Remove clap" : "Clap"} for recognition (${claps} claps)`}
        >
          <span className="relative inline-flex overflow-hidden rounded-full">
            <Icons.clap
              className={`h-5 w-5 transition-transform ${
                hasClapped
                  ? "scale-100 fill-current"
                  : "scale-90 group-hover:scale-100"
              }`}
            />
            {isAnimating && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Icons.clap className="h-5 w-5 animate-ping opacity-75" />
              </span>
            )}
          </span>
          <span>{claps}</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default RecognitionCard;
