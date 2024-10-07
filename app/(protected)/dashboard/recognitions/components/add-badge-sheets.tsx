import React from "react";
import { RecognationBadges } from "@prisma/client";
import { AwardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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

const badges = [
  { id: RecognationBadges.STAR_PERFORMER, name: "Star Performer", icon: "🌟" },
  {
    id: RecognationBadges.OUTSTANDING_ACHIEVEMENT,
    name: "Outstanding Achievement",
    icon: "🏆",
  },
  { id: RecognationBadges.GREAT_TEAMWORK, name: "Great Teamwork", icon: "🤝" },
  {
    id: RecognationBadges.INNOVATIVE_THINKER,
    name: "Innovative Thinker",
    icon: "💡",
  },
  {
    id: RecognationBadges.CUSTOMER_FAVOURITE,
    name: "Customer Favourite",
    icon: "❤️",
  },
  { id: RecognationBadges.LEADER, name: "Leader", icon: "👑" },
];

interface BadgeSheetProps {
  selectedBadges: RecognationBadges[];
  setSelectedBadges: (badges: RecognationBadges[]) => void;
}

export function AddBadgeSheet({
  selectedBadges,
  setSelectedBadges,
}: BadgeSheetProps) {
  const toggleBadge = (badgeId: RecognationBadges) => {
    if (selectedBadges.includes(badgeId)) {
      setSelectedBadges(selectedBadges.filter((id) => id !== badgeId));
    } else {
      setSelectedBadges([...selectedBadges, badgeId]);
    }
  };

  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                className="relative bg-[#e245d6]/70 hover:bg-[#e245d6]"
                size="icon"
                aria-label="Add badges"
              >
                <AwardIcon className="size-4" />
                {selectedBadges.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {selectedBadges.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add badges</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Badges</SheetTitle>
          <SheetDescription>
            Choose one or more badges to award
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {badges.map((badge) => (
            <Button
              key={badge.id}
              variant="outline"
              className={`w-full justify-start ${
                selectedBadges.includes(badge.id)
                  ? "border-primary bg-primary/10"
                  : ""
              }`}
              onClick={() => toggleBadge(badge.id)}
            >
              <span className="mr-2 text-2xl">{badge.icon}</span>
              {badge.name}
              {selectedBadges.includes(badge.id) && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </Button>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedBadges([])}
            disabled={selectedBadges.length === 0}
          >
            Clear All
          </Button>
          <SheetClose asChild>
            <Button>Confirm ({selectedBadges.length})</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
