"use client";

import React, { useState } from "react";
import { BadgePlus } from "lucide-react";

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

interface PointsSheetProps {
  points: number;
  setPoints: (points: number) => void;
}

export function AddPointsSheet({ points, setPoints }: PointsSheetProps) {
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const pointButtons = [10, 20, 50, 75, 100, 200];

  const handlePointSelection = (value: number) => {
    setSelectedPoints(value);
  };

  const handleSave = () => {
    if (selectedPoints !== null) {
      setPoints(selectedPoints);
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                className="relative bg-[#ff886a]/90 hover:bg-[#ff886a]"
                size="icon"
                aria-label="Select points"
                onClick={() => setIsOpen(true)}
              >
                <BadgePlus className="size-4" />
                {points > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {points}
                  </span>
                )}
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select points</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Points</SheetTitle>
          <SheetDescription>Choose a point value for the team member</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <div className="mb-2 text-sm font-medium">Selected Points: {selectedPoints || 'None'}</div>
          <div className="grid grid-cols-2 gap-4">
            {pointButtons.map((value) => (
              <Button
                key={value}
                onClick={() => handlePointSelection(value)}
                variant={selectedPoints === value ? "default" : "outline"}
                className="w-full"
              >
                {value} points
              </Button>
            ))}
          </div>
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