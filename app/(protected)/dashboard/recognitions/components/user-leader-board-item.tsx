import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AwardIcon } from "lucide-react";

interface UserLeaderBoardItemProps{
    index: number
}

const UserLeaderBoardItem = ({index}: UserLeaderBoardItemProps) => {
  return (
    <div className="flex select-none flex-row items-center gap-x-3">
      <div className="text-muted-foreground">
        <Avatar className="size-6 border border-primary">
          <div className="m-auto flex w-full flex-col items-center text-xs text-primary">
            {index}
          </div>
        </Avatar>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-y-[0.2px]">
        <div className="font-medium">Rami Borni</div>
        <div className="text-sm font-light text-muted-foreground">
            rami@recognify.io
        </div>
      </div>
      <div className="flex flex-row items-center">
        <AwardIcon className="size-4 text-primary" />
        <span className="font-bold text-primary">100</span>
      </div>
    </div>
  );
};

export default UserLeaderBoardItem;
