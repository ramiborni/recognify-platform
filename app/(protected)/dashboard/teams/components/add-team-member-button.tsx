"use client";

import React, { useState } from "react";
import { addTeamMember } from "@/actions/api/teams";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

interface AddTeamMemberMutateProps {
  invitationName: string;
  invitationEmail: string;
  token: string;
}

interface AddTeamMemberButtonProps {}
const AddTeamMemberButton = ({}: AddTeamMemberButtonProps) => {
  const {
    user,
    getToken,
    isAuthenticated,
    isLoading: isKindeLoading,
  } = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate: addTeamMemberMutate } = useMutation({
    mutationFn: async ({
      invitationName,
      invitationEmail,
      token,
    }: AddTeamMemberMutateProps) =>
      await addTeamMember(invitationName, invitationEmail),
    onSuccess: async () => {
      toast({
        variant: "success",
        title: "Team member added successfully",
        description: `The team member ${name} has been added successfully.`,
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
    if (!name || !email) {
      return toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both name and email to add a team member.",
      });
    }

    addTeamMemberMutate({
      invitationName: name,
      invitationEmail: email,
      token: getToken()!,
    });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="size-6" /> &nbsp; Add team member
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Please enter the details of the team member you want to add.
          </DialogDescription>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={addMember}>Invite team member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTeamMemberButton;
