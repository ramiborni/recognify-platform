"use client";

import React from "react";
import { BadgePlus, Check, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                className="relative bg-[#ff886a]/90 hover:bg-[#ff886a]"
                size="icon"
                aria-label="Add points"
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
            <p>Add points</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Points</SheetTitle>
          <SheetDescription>Adjust points for the team member</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setPoints(Math.max(0, points - 10))}
          >
            <Minus className="size-4" />
          </Button>
          <Input
            type="number"
            value={points}
            onChange={(e) =>
              setPoints(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="w-20 text-center"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setPoints(points + 10)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
