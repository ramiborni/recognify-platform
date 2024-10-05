import React from "react";

import RecognitionCard from "./recognition-card";
import { getRecognitions } from "@/actions/get-recognitions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ListRecognitions = async () => {
  const {getUser} = getKindeServerSession();
  const kindeUser = await getUser();
  const recognitions = await getRecognitions(kindeUser.id);
  return (
    <div className="my-12 flex flex-col gap-y-6">
      {recognitions.map((recognition) => (
        <RecognitionCard recognition={recognition} />
      ))}
    </div>
  );
};

export default ListRecognitions;
