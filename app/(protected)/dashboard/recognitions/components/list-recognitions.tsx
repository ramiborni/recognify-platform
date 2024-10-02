import React from "react";

import RecognitionCard from "./recognition-card";

const ListRecognitions = () => {
  const recognitions = [{},{},{}];
  return (
    <div className="my-12 flex flex-col gap-y-6">
      {recognitions.map((recognition) => (
        <RecognitionCard />
      ))}
    </div>
  );
};

export default ListRecognitions;
