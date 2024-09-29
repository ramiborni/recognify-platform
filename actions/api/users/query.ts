import { useQuery } from "@tanstack/react-query";
import { getUser } from ".";

export const getUserKey = () => ['user']


export const useGetUser = (token: string) => {
    const response = useQuery({
        queryKey: getUserKey(),
        queryFn: () => getUser(token),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    return response;
}