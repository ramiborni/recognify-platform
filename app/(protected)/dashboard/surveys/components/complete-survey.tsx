"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Survey } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { submitFeedback } from "@/actions/api/surveys";

interface CompleteSurveyProps {
  survey: Survey;
}

const CompleteSurvey = ({ survey }: CompleteSurveyProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      const nextQuestion = survey.questions[currentQuestionIndex + 1] as any;
      if (nextQuestion.type === "multiple-choice") {
        nextQuestion.options.forEach((option: string) => {
          new Image().src = option;
        });
      }
    }
  }, [currentQuestionIndex, survey.questions]);

  const submitAnswersMutation = useMutation({
    mutationFn: async (surveyAnswers: Record<string, string>) => await submitFeedback(survey.id, surveyAnswers),
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Survey Submitted",
        description: "Thank you for completing the survey!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Survey",
        description:
          "An error occurred while submitting your answers. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCurrentQuestionAnswered()) {
      submitAnswersMutation.mutate(answers);
    } else {
      setShowError(true);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = survey.questions[currentQuestionIndex] as any;
    return !!answers[currentQuestion.id];
  };

  const goToNextQuestion = () => {
    if (isCurrentQuestionAnswered()) {
      if (currentQuestionIndex < survey.questions.length - 1) {
        setDirection(1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowError(false);
      }
    } else {
      setShowError(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowError(false);
    }
  };

  const currentQuestion = survey.questions[currentQuestionIndex] as any;
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  const getPlaceholder = (type: string) => {
    switch (type) {
      case "short-answer":
        return "Enter a brief answer";
      case "long-answer":
        return "Type your detailed response here...";
      case "multiple-choice":
        return "Select one option";
      default:
        return "Enter your answer";
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (submitAnswersMutation.isPending) {
    return (
      <Card className="mt-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <CardContent className="flex h-[400px] items-center justify-center p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="mt-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <CardContent className="flex h-[400px] flex-col items-center justify-center p-6 text-center">
          <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
          <h2 className="mb-2 text-2xl font-bold text-primary">
            Survey Completed!
          </h2>
          <p className="text-muted-foreground">
            Thank you for your valuable feedback.
          </p>
          <Link href="/dashboard/surveys/">
            <Button className="mt-6">Return to Surveys</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent className="p-6">
        <Progress
          value={progress}
          className="mb-4 h-2 bg-gray-200 dark:bg-gray-700"
        />
        <p className="mb-6 text-sm font-medium text-muted-foreground">
          Question {currentQuestionIndex + 1} of {survey.questions.length}
        </p>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <Label
                htmlFor={currentQuestion.id}
                className="text-xl font-bold text-primary"
              >
                {currentQuestion.text}
              </Label>
              <>
                {currentQuestion.type === "short-answer" && (
                  <Input
                    id={currentQuestion.id}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                    className={cn(
                      "mt-2 transition-all duration-200 focus:ring-2 focus:ring-primary",
                      showError &&
                        !answers[currentQuestion.id] &&
                        "border-red-500",
                    )}
                    placeholder={getPlaceholder(currentQuestion.type)}
                  />
                )}
                {currentQuestion.type === "long-answer" && (
                  <Textarea
                    id={currentQuestion.id}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQuestion.id, e.target.value)
                    }
                    className={cn(
                      "mt-2 transition-all duration-200 focus:ring-2 focus:ring-primary",
                      showError &&
                        !answers[currentQuestion.id] &&
                        "border-red-500",
                    )}
                    rows={5}
                    placeholder={getPlaceholder(currentQuestion.type)}
                  />
                )}
                {currentQuestion.type === "multiple-choice" &&
                  currentQuestion.options && (
                    <RadioGroup
                      onValueChange={(value) =>
                        handleAnswerChange(currentQuestion.id, value)
                      }
                      value={answers[currentQuestion.id] || ""}
                      className={cn(
                        "mt-2 space-y-2",
                        showError &&
                          !answers[currentQuestion.id] &&
                          "rounded-md border border-red-500 p-2",
                      )}
                    >
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-2 rounded-md p-3 transition-colors duration-200 hover:bg-muted"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${currentQuestion.id}-${index}`}
                            className="border-2 border-primary text-primary"
                          />
                          <Label
                            htmlFor={`${currentQuestion.id}-${index}`}
                            className="flex-grow cursor-pointer text-sm font-medium"
                          >
                            {option}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  )}
                {showError && !answers[currentQuestion.id] && (
                  <p className="flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    This question is required
                  </p>
                )}
              </>
            </form>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between">
          <Button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="transition-all duration-200 hover:bg-muted"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {currentQuestionIndex === survey.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={submitAnswersMutation.isPending}
              className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90"
            >
              {submitAnswersMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Survey <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={goToNextQuestion}
              className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompleteSurvey;
