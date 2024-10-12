"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { recordClap, removeClap } from "@/actions/api/recognitions";
import { Clap, RecognationBadges, Recognition, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, AwardIcon } from "lucide-react";

import { timeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

interface RecognitionCardProps {
  recognition: Recognition & { receiver: User; giver: User; claps: Clap[] };
  currentUserId: string;
}

const RecognitionCard = ({ recognition, currentUserId }: RecognitionCardProps) => {
  const [claps, setClaps] = useState(recognition.claps.length);
  const [hasClapped, setHasClapped] = useState(recognition.claps.some(clap => clap.userId === currentUserId));
  const [isAnimating, setIsAnimating] = useState(false);
  const queryClient = useQueryClient();
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
      // Optimistically update the UI
      setClaps((prevClaps) => (hasClapped ? prevClaps - 1 : prevClaps + 1));
      if (!hasClapped) {
        setIsAnimating(true);
      }
    },
    onSuccess: () => {
      // Update the hasClapped state only after successful API call
      setHasClapped((prev) => !prev);
      router.refresh();
    },
    onError: (error) => {
      // Revert optimistic update
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

  return (
    <>
      <Card className="rounded-lg border animate-in fade-in-100">
        <CardTitle className="px-6 py-4">
          <div className="flex flex-row items-center gap-x-3">
            <Avatar>
              <AvatarImage
                src={recognition.giver.profilePicture!}
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
            <Avatar>
              <AvatarImage
                src={recognition.receiver.profilePicture!}
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
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap justify-start gap-2">
            {recognition.badges.map((badge) => (
              <RecognitionBadge key={badge} badgeId={badge} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClap}
              disabled={clapMutation.isPending}
              className={`group flex items-center gap-1 text-sm font-medium transition-colors ${
                hasClapped
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              aria-label={`${hasClapped ? "Remove clap" : "Clap"} for recognition (${claps} claps)`}
            >
              <span className="relative inline-flex overflow-hidden rounded-full">
                <Icons.clap
                  className={`size-5 transition-transform ${
                    hasClapped
                      ? "scale-100 fill-current"
                      : "scale-90 group-hover:scale-100"
                  }`}
                />
                {isAnimating && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Icons.clap className="size-5 animate-ping opacity-75" />
                  </span>
                )}
              </span>
              <span>{claps}</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecognitionCard;
