import React from "react";
import { AwardIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

import AddRecognitionDialog from "./components/add-recognition-dialog";
import Leaderboard from "./components/leaderboard";
import ListRecognitions from "./components/list-recognitions";

const RecognitionPage = () => {
  return (
    <>
      <DashboardHeader
        heading="Recognitions"
        text={`Discover your recognitions and celebrate your team's achievements!`}
      >
        <AddRecognitionDialog />
      </DashboardHeader>
      <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-5">
        <div className="col-span-3">
          <ListRecognitions />
        </div>
        <div className="col-span-2">
          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default RecognitionPage;
