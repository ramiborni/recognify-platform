"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Feedback, Survey, User, UserRole } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { ChartPieIcon, Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import EditSurvey from "./edit-survey"; // Import the EditSurvey component

interface SurveysGridProps {
  surveys: (Survey & { selectedTeamMembers: User[]; responses: Feedback[] })[];
  userRole: UserRole;
}

export const deleteSurvey = async (surveyId: string) => {
  const response = await axios.delete("/api/surveys/" + surveyId);
  return response.data;
};

const SurveysGrid: React.FC<SurveysGridProps> = ({ surveys, userRole }) => {
  const [deletingSurveyId, setDeletingSurveyId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<
    (Survey & { selectedTeamMembers: User[] }) | null
  >(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: deleteSurvey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys"] });
      setDeletingSurveyId(null);
      toast({
        title: "Survey Deleted",
        description: "The survey has been successfully deleted.",
      });
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Error Deleting Survey",
        description:
          "An error occurred while deleting the survey. Please try again or contact support.",
        variant: "destructive",
      });
      setDeletingSurveyId(null);
    },
  });

  const getStatusColor = (status: Survey["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200 text-yellow-800 hover:bg-yellow-300";
      case "ACTIVE":
        return "bg-green-200 text-green-800 hover:bg-green-300";
      case "COMPLETED":
        return "bg-blue-200 text-blue-800 hover:bg-blue-300";
      default:
        return "bg-gray-200 text-gray-800 hover:bg-gray-300";
    }
  };

  const handleDeleteClick = (surveyId: string) => {
    setDeletingSurveyId(surveyId);
  };

  const handleConfirmDelete = () => {
    if (deletingSurveyId) {
      deleteMutation.mutate(deletingSurveyId);
    }
  };

  const handleEditClick = (
    survey: Survey & { selectedTeamMembers: User[] },
  ) => {
    setEditingSurvey(survey);
    setEditDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="col-span-2 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate text-lg font-semibold">
                  {survey.title}
                </span>
                <Badge className={getStatusColor(survey.status)}>
                  {survey.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-6 flex-grow">
              <p className="mb-2 text-sm text-gray-500">
                Created on {format(survey.createdAt, "MMM d, yyyy")}
              </p>
              <p className="my-6 text-sm text-muted-foreground">
                {survey.description}
              </p>

              <p className="mb-2 text-sm">
                {survey.questions!.length} question
                {survey.questions!.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
            <CardFooter className="flex gap-x-2">
              {userRole === UserRole.USER && (
                <>
                  <div className="flex-1"></div>
                  {survey.responses.length <= 0 && (
                    <Link href={"/dashboard/surveys/" + survey.id}>
                      <Button>Start Your Survey</Button>
                    </Link>
                  )}
                  {survey.responses.length > 0 && (
                    <Link href={"/dashboard/surveys/" + survey.id + "/review"}>
                      <Button>Review your answers</Button>
                    </Link>
                  )}
                </>
              )}
              {userRole === UserRole.TEAM_LEADER && (
                <>
                  <Link href={"/dashboard/survey/" + survey.id + "/statistics"}>
                    <Button>
                      <ChartPieIcon className="mr-2 size-6" />
                      Statistics and Answers
                    </Button>
                  </Link>
                  <div className="flex-1"></div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(survey)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
                    size="sm"
                    onClick={() => handleDeleteClick(survey.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!deletingSurveyId}
        onOpenChange={() => setDeletingSurveyId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this survey? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingSurveyId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingSurvey && (
        <EditSurvey
          survey={editingSurvey}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) setEditingSurvey(null);
          }}
          onSuccess={() => {
            setEditDialogOpen(false);
            setEditingSurvey(null);
            queryClient.invalidateQueries({ queryKey: ["surveys"] });
            toast({
              title: "Survey Updated",
              description: "The survey has been successfully updated.",
            });
            router.refresh();
          }}
        />
      )}
    </>
  );
};

export default SurveysGrid;
