"use client";

import React from "react";
import { AwardIcon, BadgePlus, UserPlus } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AddRecognitionDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <AwardIcon className="mr-1" />
            Add Recognition
          </Button>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          className="w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Add Recognition to a team member</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-2">
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger asChild>
                    <Button size="icon">
                      <UserPlus />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Add team member</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-[#e245d6]/70 hover:bg-[#e245d6]"
                      size="icon"
                    >
                      <AwardIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Add badges</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-[#ff886a]/90 hover:bg-[#ff886a]"
                      size="icon"
                    >
                      <BadgePlus />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Add points</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-col items-end gap-y-4">
              <Textarea
                minLength={10}
                placeholder="Write a good recognition for your team member"
              ></Textarea>
              <div className="flex flex-row items-center gap-x-2">
                <Label htmlFor="private" className="text-[0.8rem] font-semibold">Make it private</Label>
                <Switch id="private"></Switch>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button>Add Recognition</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddRecognitionDialog;
