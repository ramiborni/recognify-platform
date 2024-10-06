import axios from "axios";
import { Question } from "../recognitions/types";



export const addNewSurvey = async (
    title: string,
    description: string,
    questions: Question[],
    selectedTeamMembers: string[]
) => {
  const response = await axios.post("/api/surveys", {
    title,
    description,
    questions,
    teamMembers: selectedTeamMembers
  });

  return response.data;
};
