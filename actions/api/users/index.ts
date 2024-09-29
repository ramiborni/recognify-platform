import axios from "axios";

export const addUser = async (token: string, inviteToken: string) => {
  const response = await axios.post(
    "/api/users",
    {
      inviteToken: inviteToken,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",

      },
    },
  );

  return response.data;
};

export const getUser = async (token: string) => {
  const response = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
