import { env } from "@/env.mjs";
import axios from "axios";

export const addTeamMember = async (
    userFullName: string,
    userEmail: string,
    token: string
) => {
    console.log(token);
    const response = await axios.post(
        env.NEXT_PUBLIC_APP_URL+"/api/teams",
        { name: userFullName, email: userEmail },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}
