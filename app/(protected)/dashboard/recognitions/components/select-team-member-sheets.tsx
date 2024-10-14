"use client";

import React, { useEffect, useState } from "react";
import { useGetTeamMembers } from "@/actions/api/teams/query";
import { Check, Loader2Icon, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TeamMemberSheetProps {
  selectedMember: string | null;
  setSelectedMember: (id: string) => void;
}

export function SelectTeamMemberSheet({
  selectedMember,
  setSelectedMember,
}: TeamMemberSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedMember, setTempSelectedMember] = useState<string | null>(selectedMember);

  const {
    data: team,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTeamMembers();

  const calculateTotalPoints = (recognitions: { points: number }[]) => {
    let totalPoints = recognitions.reduce(
      (sum, recognition) => sum + recognition.points,
      0,
    );
    return totalPoints;
  };

  useEffect(() => {
    if (!team) {
      refetch();
    }
  }, [team, isLoading, error]);

  const handleSave = () => {
    setSelectedMember(tempSelectedMember!);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                size="icon"
                aria-label="Add team member"
                className="relative bg-primary/90"
                onClick={() => setIsOpen(true)}
              >
                <UserPlus className="size-4" />
                {selectedMember && (
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add team member</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Team Member</SheetTitle>
          <SheetDescription>Choose a team member to recognize</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {team &&
            team!.teamMembers.map((member) => (
              <Button
                key={member.id}
                variant="outline"
                className={`w-full justify-start py-6 ${
                  tempSelectedMember === member.id ? "border-primary" : ""
                }`}
                onClick={() => setTempSelectedMember(member.id)}
              >
                <Avatar className="mr-2 size-8">
                  <AvatarImage
                    src={member.profilePicture!}
                    alt={member.name!}
                  />
                  <AvatarFallback>{member.name!.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span>{member.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {calculateTotalPoints(member.recognitionsReceived)} points
                  </span>
                </div>
              </Button>
            ))}
          {isLoading && <Loader2Icon className="animate-spin" />}
          {isError && (
            <div>
              Something wrong happened, please contact the support team to solve
              this issue.
            </div>
          )}
        </div>
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button type="submit" onClick={handleSave}>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}