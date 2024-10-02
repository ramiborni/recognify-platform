import React from "react";
import { AwardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import ListRecognitions from "./components/list-recognitions";
import Leaderboard from "./components/leaderboard";

const RecognitionPage = () => {
  return (
    <>
      <DashboardHeader
        heading="Recognitions"
        text={`Discover your recognitions and celebrate your team's achievements!`}
      >
        <Button>
          <AwardIcon className="mr-1" />
          Add Recognition
        </Button>
      </DashboardHeader>
      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
        <div className="col-span-2">
          <ListRecognitions />
        </div>
        <div className="col-span-1">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default RecognitionPage;
