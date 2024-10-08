import React from "react";
import { getLeaderboard } from "@/actions/leaderboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TrophyIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

import UserLeaderBoardItem from "./user-leader-board-item";

const Leaderboard = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const users = await getLeaderboard(kindeUser.id);

  return (
    <div className="my-12">
      <Card className="rounded-lg border animate-in fade-in-100">
        <CardTitle className="text-priamry flex flex-row items-center gap-x-3 px-6 py-4">
          <Avatar className="bg-primary/20">
            <div className="m-auto flex w-full flex-col items-center text-xs text-primary">
              <TrophyIcon className="size-6" />
            </div>
          </Avatar>
          <span>Leaderboard</span>
        </CardTitle>
        <CardContent>
          <div className="my-8 flex flex-col gap-y-8">
            {users!.map((user, index) => (
              <UserLeaderBoardItem user={user} index={index + 1} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
