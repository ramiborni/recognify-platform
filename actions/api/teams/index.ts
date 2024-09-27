import axios from "axios";

export const addTeamMember = async (
    userFullName: string,
    userEmail: string
) => {
    const response = await axios.post(
        "/api/teams",
        { name: userFullName, email: userEmail },
    );

    return response.data;
}