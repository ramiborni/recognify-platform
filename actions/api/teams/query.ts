import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from ".";

export const getTeamMembersKey = () => ['team']


export const useGetTeamMembers = () => {
    const response = useQuery({
        queryKey: getTeamMembersKey(),
        queryFn: () => getTeamMembers(),
        refetchOnWindowFocus: true,
        retry: 0,
    });

    return response;
}