import { AuthorizedRequest } from "@/types";

export interface AddUserMutationProps extends AuthorizedRequest {
    inviteToken: string
}