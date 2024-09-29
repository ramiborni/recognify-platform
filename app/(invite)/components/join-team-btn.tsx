"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface JoinTeamBtnProps {
  token: string;
}

const JoinTeamBtn = ({ token }: JoinTeamBtnProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinTeam = () => {
    setLoading(true);
    router.push(
      "/api/auth/login?post_login_redirect_url=/dashboard?invitationToken=" +
        token,
    );
  };

  return (
    <Button onClick={joinTeam} disabled={loading}>
      {loading ? <LoaderIcon className="animate-spin" /> : "Join the team!"}
    </Button>
  );
};

export default JoinTeamBtn;
