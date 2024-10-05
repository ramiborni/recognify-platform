import { useQuery } from "@tanstack/react-query";
import { getUser } from ".";

export const getUserKey = () => ['user']


export const useGetUser = () => {
    const response = useQuery({
        queryKey: getUserKey(),
        queryFn: () => getUser(),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    return response;
}