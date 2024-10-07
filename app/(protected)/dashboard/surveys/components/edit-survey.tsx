"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editSurvey } from "@/actions/api/surveys";
import { Question } from "@/actions/api/surveys/types";
import { useGetTeamMembers } from "@/actions/api/teams/query";
import { Survey, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import {
  Loader2,
  Minus,
  NotepadText,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface EditSurveyProps {
  survey: Survey & { selectedTeamMembers: User[] };
  open: boolean;
  onOpenChange: (boolean) => void;
  onSuccess: () => void;
}

interface EditSurveyMutateProps {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  selectedTeamMembers: string[];
}

const EditSurvey: React.FC<EditSurveyProps> = ({
  survey,
  open,
  onOpenChange,
  onSuccess,
}) => {
  const [title, setTitle] = useState(survey.title);
  const [description, setDescription] = useState(survey.description);
  const [questions, setQuestions] = useState<Question[]>(
    survey.questions as unknown as Question[],
  );
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    survey.selectedTeamMembers.map((member) => member.id),
  );

  const router = useRouter();
  const {
    data: team,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTeamMembers();

  const { isPending, mutate: EditSurveyMutate } = useMutation({
    mutationFn: async ({
      id,
      title,
      description,
      questions,
      selectedTeamMembers,
    }: EditSurveyMutateProps) =>
      await editSurvey(id, title, description, questions, selectedTeamMembers),
    onSuccess,
    onError(error) {
      toast({
        title: "Error Updating Survey",
        description:
          "An error occurred while updating the survey. Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: String(questions.length + 1), text: "", type: "short-answer" },
    ]);
  };

  const handleQuestionChange = (
    id: string,
    field: keyof Question,
    value: string,
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          if (field === "type") {
            return {
              ...q,
              [field]: value as
                | "multiple-choice"
                | "short-answer"
                | "long-answer",
              options: value === "multiple-choice" ? [""] : undefined,
            };
          }
          return { ...q, [field]: value };
        }
        return q;
      }),
    );
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleAddOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          return { ...q, options: [...q.options, ""] };
        }
        return q;
      }),
    );
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          return {
            ...q,
            options: q.options.filter((_, index) => index !== optionIndex),
          };
        }
        return q;
      }),
    );
  };

  const handleOptionChange = (
    questionId: string,
    optionIndex: number,
    value: string,
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    EditSurveyMutate({
      id: survey.id,
      title: title,
      description: description,
      questions: questions,
      selectedTeamMembers: selectedMembers,
    });
  };

  useEffect(() => {
    if (!team) {
      refetch();
    }
  }, [team, isLoading, error]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <NotepadText className="mr-2" />
          Edit Survey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Team Survey</DialogTitle>
          <DialogDescription>
            Update your survey details, questions, and team member assignments.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pl-4 pr-4">
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input
                  id="survey-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your survey"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="survey-description">Survey Description</Label>
                <Textarea
                  id="survey-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of the survey"
                  required
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Survey Questions</Label>
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="grid gap-2 rounded-md border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`question-${question.id}`}>
                        Question {index + 1}
                      </Label>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      id={`question-${question.id}`}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(
                          question.id,
                          "text",
                          e.target.value,
                        )
                      }
                      placeholder="Enter your question"
                      required
                    />
                    <Select
                      value={question.type}
                      onValueChange={(value) =>
                        handleQuestionChange(question.id, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="short-answer">
                          Short Answer
                        </SelectItem>
                        <SelectItem value="long-answer">Long Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    {question.type === "multiple-choice" &&
                      question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center space-x-2"
                            >
                              <Input
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    question.id,
                                    optionIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveOption(question.id, optionIndex)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddOption(question.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Option
                          </Button>
                        </div>
                      )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAddQuestion}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Team Members</Label>
                {team?.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={selectedMembers.includes(member.id!)}
                      onCheckedChange={() => handleMemberToggle(member.id!)}
                      required={selectedMembers.length === 0}
                    />
                    <Label
                      htmlFor={`member-${member.id}`}
                      className="flex cursor-pointer items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarImage
                          src={member.profilePicture!}
                          alt={member.name!}
                        />
                        <AvatarFallback>
                          {member
                            .name!.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {member.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
                {isLoading && <Loader2 className="animate-spin" />}
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              {!isPending && <>Update Survey</>}
              {isPending && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSurvey;
