import axios from "axios";

import { Question } from "./types";

export const addNewSurvey = async (
  title: string,
  description: string,
  questions: Question[],
  selectedTeamMembers: string[],
) => {
  const response = await axios.post("/api/surveys", {
    title,
    description,
    questions,
    teamMembers: selectedTeamMembers,
  });

  return response.data;
};

export const editSurvey = async (
  id: string,
  title: string,
  description: string,
  questions: Question[],
  selectedTeamMembers: string[],
) => {
  const response = await axios.patch("/api/surveys/" + id, {
    title,
    description,
    questions,
    teamMembers: selectedTeamMembers,
  });

  return response.data;
};

export const deleteSurvey = async (surveyId: string) => {
  const response = await axios.delete("/api/surveys/" + surveyId);

  return response.data;
};


export const submitFeedback = async (
  surveyId: string,
  surveyResponses: Record<string, string>
) => {
  const response = await axios.post("/api/surveys/feedback", {
      surveyId,
      surveyResponses
  });

  return response.data;
}