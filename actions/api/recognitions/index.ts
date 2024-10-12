import { RecognationBadges } from "@prisma/client";
import axios from "axios";

export const addRecognition = async (
  recognition: string,
  selectedMember: string,
  points: number,
  badges: RecognationBadges[],
  isPrivate: boolean,
) => {
  const response = await axios.post("/api/recognitions", {
    message: recognition,
    receiverId: selectedMember,
    points,
    badges,
    isPublic: !isPrivate,
  });

  return response.data;
};


export const recordClap = async (recognitionId: string) => {
  try {
    const response = await axios.post(`/api/recognitions/${recognitionId}/clap`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to record clap');
  }
};

export const removeClap = async (recognitionId: string) => {
  try {
    const response = await axios.delete(`/api/recognitions/${recognitionId}/clap`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove clap');
  }
};