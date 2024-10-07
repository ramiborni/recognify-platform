import React from "react";
import { User } from "@prisma/client";
import { AwardIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserLeaderBoardItemProps {
  index: number;
  user: User & { points: number };
}

const UserLeaderBoardItem = ({ index, user }: UserLeaderBoardItemProps) => {
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
        <AvatarImage src={user.profilePicture!} alt="Porfile Picture" />
        <AvatarFallback>{user.name!.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-y-[0.2px]">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm font-light text-muted-foreground">
          {user.email}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <AwardIcon className="size-4 text-primary" />
        <span className="font-bold text-primary">{user.points}</span>
      </div>
    </div>
  );
};

export default UserLeaderBoardItem;
