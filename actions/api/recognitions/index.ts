import { RecognationBadges } from "@prisma/client";
import axios from "axios";

export const addRecognition = async (
    recognition: string,
    selectedMember: string,
    points: number,
    badges: RecognationBadges[],
    isPrivate: boolean
) => {
    const response = await axios.post("/api/recognitions", {
        message:recognition,
        receiverId:selectedMember,
        points,
        badges,
        isPublic: !isPrivate
    });

    return response.data;
}