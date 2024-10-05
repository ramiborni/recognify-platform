"use client";

import React, { useState } from "react";
import { addRecognition } from "@/actions/api/recognitions";
import { RecognationBadges } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  AwardIcon,
  BadgePlus,
  Film,
  Image as ImageIcon,
  Loader2,
  TrophyIcon,
  UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast, useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

import { AddBadgeSheet } from "./add-badge-sheets";
import { AddPointsSheet } from "./add-points-sheets";
import { SelectTeamMemberSheet } from "./select-team-member-sheets";
import {useRouter} from "next/navigation"

interface AddRecognitionMutateProps {
  recognition: string;
  selectedMember: string;
  points: number;
  badges: RecognationBadges[];
  isPrivate: boolean;
}

export default function AddRecognitionDialog() {
  const router = useRouter();
  const { isPending, mutate: AddRecognitionMutate } = useMutation({
    mutationFn: async ({
      recognition,
      selectedMember,
      points,
      badges,
      isPrivate,
    }: AddRecognitionMutateProps) =>
      await addRecognition(
        recognition,
        selectedMember,
        points,
        badges,
        isPrivate,
      ),
    onSuccess() {
      toast({
        title: "Recognition Added!",
        description:
          "Thank you for spreading positivity and recognizing your team! Your recognition has been successfully shared.",
      });
      setIsOpen(false);
      router.refresh()
    },
    onError(error) {
      toast({
        title: "Something wrong happened",
        description: "Please try again, or contact rami@recognify.io",
        variant: "destructive",
      });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [recognition, setRecognition] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [selectedBadges, setSelectedBadges] = useState<RecognationBadges[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedMember) {
      toast({
        title: "Missing team member",
        description: "Please select a team member to recognize.",
        variant: "destructive",
      });
      return;
    }

    if (recognition.length < 10) {
      toast({
        title: "Recognition too short",
        description:
          "Please write a recognition message of at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    if (points === 0) {
      toast({
        title: "No points added",
        description: "Please add some points to the recognition.",
        variant: "destructive",
      });
      return;
    }

    if (selectedBadges.length === 0) {
      toast({
        title: "No badges selected",
        description: "Please select at least one badge for the recognition.",
        variant: "destructive",
      });
      return;
    }

    AddRecognitionMutate({
      recognition: recognition,
      isPrivate: isPrivate,
      points: points,
      selectedMember: selectedMember,
      badges: selectedBadges,
    });
  };

  const GifIcon = Icons.gif;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <AwardIcon className="mr-2 size-4" />
          Add Recognition
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Recognition to a team member</DialogTitle>
            <DialogDescription>
              Recognize your team member&apos;s achievements. Click submit when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid gap-4">
            <div className="flex gap-2">
              <SelectTeamMemberSheet
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
              />

              <AddBadgeSheet
                selectedBadges={selectedBadges}
                setSelectedBadges={setSelectedBadges}
              />

              <AddPointsSheet points={points} setPoints={setPoints} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="recognition">Recognition</Label>
              <Textarea
                id="recognition"
                value={recognition}
                onChange={(e) => setRecognition(e.target.value)}
                placeholder="Write a good recognition for your team member"
                minLength={10}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Switch
                id="private"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
              <Label htmlFor="private">Make it private</Label>
              <div className="flex-1"></div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label="Upload photo"
                    >
                      <ImageIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Upload photo <Badge className="h-20">Soon</Badge>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label="Upload GIF"
                    >
                      <GifIcon className="size-4 fill-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon: Upload GIF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label="Upload video"
                    >
                      <Film className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon: Upload video</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button disabled={isPending} type="submit">
              {!isPending && (
                <>
                  <TrophyIcon className="mr-2 size-4" />
                  Add Recognition
                </>
              )}
              {isPending && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
