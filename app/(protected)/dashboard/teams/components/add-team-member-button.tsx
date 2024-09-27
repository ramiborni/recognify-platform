"use client";

import { addTeamMember } from "@/actions/api/teams";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PlusIcon } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AddTeamMemberButtonProps {}
const AddTeamMemberButton = ({}: AddTeamMemberButtonProps) => {
  const { mutate: addTeamMemberMutate } = useMutation({
    mutationFn: () => addTeamMember("Rami", "rikiraspoutine@googlemail.com"),
    onSuccess: async () => {
      const signInResult = await signIn("resend-invite", {
        email: "rikiraspoutine@googlemail.com",
        redirect: false,
        callbackUrl: "/dashboard/invited-user",
      });

      if (signInResult?.error) {
        return toast({
          variant: "destructive",
          title: "Oops! Something went wrong",
          description: "An error occurred while inviting the team member.",
        });
      }
      toast({
        title: "Team member has been added",
        description: "The team member has been successfully added.",
      });
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
        description:
          (error.response?.data as string) ||
          "An error occurred while adding the team member.",
      });
    },
  });

  const addMember = () => {
    addTeamMemberMutate();
  };

  return (
    <Button onClick={addMember}>
      <PlusIcon className="size-6" /> &nbsp; Add team member
    </Button>
  );
};

export default AddTeamMemberButton;
