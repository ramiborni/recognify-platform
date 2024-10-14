"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { addUser } from "@/actions/api/users";
import { AddUserMutationProps } from "@/actions/api/users/types";
import {
  CreateOrgLink,
  useKindeAuth,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "@tanstack/react-query";
import { set } from "date-fns";

import { axiosConfig } from "@/lib/axios-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OrgModel = () => {
  const {
    user: kindeUser,
    getToken,
    isLoading: isAuthLoading,
    isAuthenticated,
  } = useKindeBrowserClient();

  const [isAxiosConfigured, setIsAxiosConfigured] = useState(false);

  useEffect(() => {
    const accessToken = getToken();
    if (accessToken) {
      axiosConfig(accessToken!);
      setIsAxiosConfigured(true);
    }
  }, [kindeUser, isAuthLoading, getToken]);

  return <></>;

  const [step, setStep] = useState(0);
  const [openOnBoardingDialog, setOpenOnBoardingDialog] = useState(false);
  const [teamName, setTeamName] = useState("");

  const Step0 = () => (
    <>
      <DialogHeader>
        <DialogTitle>Welcome to Recognify!</DialogTitle>
        <DialogDescription>
          Welcome to Recognify, the best platform for employee recognition and
          feedback.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Image
          className="size-full object-cover object-center dark:opacity-85 dark:invert"
          src="/_static/blog/blog-post-3.jpg"
          alt="preview landing"
          width={2000}
          height={1000}
          priority={true}
        />
      </div>
      <DialogFooter>
        <Button onClick={() => setOpenOnBoardingDialog(false)}>
          Get Started
        </Button>
      </DialogFooter>
    </>
  );

  const Step1 = () => (
    <>
      <DialogHeader>
        <DialogTitle>Create Team</DialogTitle>
        <DialogDescription>
          Let&apos;s create your first team to get started.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Label htmlFor="team-name">Team Name</Label>
        <Input
          id="team-name"
          placeholder="Enter Team Name"
          value={teamName}
          defaultValue={teamName}
        />
      </div>
      <DialogFooter>
        <CreateOrgLink
          className="inline-flex h-10 select-none items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          orgName={teamName}
        >
          Create Team
        </CreateOrgLink>
      </DialogFooter>
    </>
  );

  const Step2 = () => (
    <>
      <DialogHeader>
        <DialogTitle>Team Created</DialogTitle>
        <DialogDescription>
          Your team has been created successfully.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => setOpenOnBoardingDialog(false)}>Done</Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog
      open={openOnBoardingDialog}
      onOpenChange={(open) => setOpenOnBoardingDialog(open)}
    >
      <DialogContent className="sm:max-w-[425px]">
        {step === 0 && <Step0 />}
      </DialogContent>
    </Dialog>
  );
};

export default OrgModel;
