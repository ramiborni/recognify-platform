"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Feedback, Survey } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReviewResponsesProps {
  survey: Survey & { responses: Feedback[] };
}

const ReviewResponses: React.FC<ReviewResponsesProps> = ({ survey }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentQuestion = survey.questions[currentQuestionIndex] as any;
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  const goToNextQuestion = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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

  const getCurrentResponse = () => {
    if (survey.responses.length === 0) {
      return "No response provided";
    }

    const { responses } = survey.responses[0];
    if (!Array.isArray(responses)) {
      return "Invalid response format";
    }

    const answer = responses.find(
      (a: any) => a.questionId === currentQuestion.id,
    );
    return answer ? (answer as any).userResponse : "No answer provided";
  };

  const renderResponse = () => {
    const response = getCurrentResponse();

    switch (currentQuestion.type) {
      case "short-answer":
      case "long-answer":
        return <p className="whitespace-pre-wrap text-sm">{response}</p>;
      case "multiple-choice":
        return (
          <RadioGroup value={response} className="mt-2 space-y-2">
            {currentQuestion.options.map((option: string, index: number) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-md p-3 transition-colors duration-200 ${
                  option === response ? "bg-primary/10" : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className="border-2 border-primary text-primary"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer text-sm font-medium"
                >
                  {option}
                </Label>
                {option === response && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return <p className="text-sm">Unknown question type</p>;
    }
  };

  return (
    <Card className="mt-8 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Survey Responses
        </CardTitle>
      </CardHeader>
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
            <div className="space-y-4">
              <Label className="text-xl font-bold text-primary">
                {currentQuestion.text}
              </Label>
              <div className="rounded-md bg-muted p-4">{renderResponse()}</div>
            </div>
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
            <Link href="/dashboard/surveys">
              <Button className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90">
                Finish Review
              </Button>
            </Link>
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

export default ReviewResponses;
