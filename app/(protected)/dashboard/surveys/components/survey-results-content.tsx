"use client";

import React, { useState } from "react";
import { Feedback, Survey, User } from "@prisma/client";
import { BarChart2, ListIcon, Maximize2 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SurveyResultsContentProps {
  survey: Survey & { responses: Feedback[] };
  allUsers: User[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
];

const SurveyResultsContent: React.FC<SurveyResultsContentProps> = ({
  survey,
  allUsers,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getQuestionChartData = (questionIndex: number) => {
    const question = survey.questions[questionIndex] as any;
    const data: { [key: string]: number } = {};

    if (question.type === "multiple-choice") {
      question.options.forEach((option: string) => {
        data[option] = 0;
      });
    }

    survey.responses.forEach((response) => {
      const answers = response.responses as {
        questionId: string;
        userResponse: string;
      }[];
      const answer = answers.find((a) => a.questionId === question.id);
      if (answer) {
        if (data[answer.userResponse] !== undefined) {
          data[answer.userResponse]++;
        } else {
          data[answer.userResponse] = 1;
        }
      }
    });

    return Object.entries(data).map(([name, value]) => ({ name, value }));
  };

  const getTotalResponsesChartData = () => {
    const totalResponses = survey.responses.length;
    const totalUsers = allUsers.length;
    return [
      { name: "Answered", value: totalResponses },
      { name: "Not Answered", value: totalUsers - totalResponses },
    ];
  };

  const getUserResponseStatus = () => {
    const responseStatus = new Map<string, boolean>();
    allUsers.forEach((user) => {
      responseStatus.set(user.id, false);
    });
    survey.responses.forEach((response) => {
      responseStatus.set(response.userId, true);
    });
    return responseStatus;
  };

  const userResponseStatus = getUserResponseStatus();

  const getUserResponses = (userId: string) => {
    return (
      (survey.responses.find((response) => response.userId === userId)
        ?.responses as { questionId: string; userResponse: string }[]) || []
    );
  };

  const QuestionChart = ({
    question,
    index,
    height = 300,
  }: {
    question: any;
    index: number;
    height?: number;
  }) => (
    <div style={{ height: `${height}px`, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={getQuestionChartData(index)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {getQuestionChartData(index).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const QuestionAnswersList = ({
    question,
    index,
  }: {
    question: any;
    index: number;
  }) => (
    <div className="space-y-4">
      {survey.responses.map((response, responseIndex) => {
        const answer = (
          response.responses as { questionId: string; userResponse: string }[]
        ).find((a) => a.questionId === question.id);
        const user = allUsers.find((u) => u.id === response.userId);
        return (
          <div
            key={responseIndex}
            className="flex items-start space-x-4 rounded-lg p-4"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  user?.profilePicture || `/placeholder.svg?height=40&width=40`
                }
                alt={user?.name || "User"}
              />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">
                {user?.name || "Anonymous User"}
              </p>
              <p className="text-sm text-muted-foreground">
                {answer ? answer.userResponse : "No response"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="users">User Responses</TabsTrigger>
      </TabsList>
      <TabsContent value="charts" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {survey.questions.map((question: any, index: number) => (
            <Card key={question.id}>
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {question.type === "multiple-choice" ? (
                    <BarChart2 className="h-5 w-5" />
                  ) : (
                    <ListIcon className="h-5 w-5" />
                  )}
                  <span>Question {index + 1}</span>
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Maximize2 className="h-4 w-4" />
                      <span className="sr-only">Expand question details</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Question {index + 1}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[calc(90vh-4rem)] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">
                            {question.text}
                          </h3>
                          <p className="mb-4 text-sm text-muted-foreground">
                            Total Responses: {survey.responses.length}
                          </p>
                        </div>
                        {question.type === "multiple-choice" ? (
                          <Card>
                            <CardHeader>
                              <CardTitle>Response Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <QuestionChart
                                question={question}
                                index={index}
                                height={400}
                              />
                            </CardContent>
                          </Card>
                        ) : (
                          <Card>
                            <CardHeader>
                              <CardTitle>Responses</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <QuestionAnswersList
                                question={question}
                                index={index}
                              />
                            </CardContent>
                          </Card>
                        )}
                        {question.type === "multiple-choice" && (
                          <Card>
                            <CardHeader>
                              <CardTitle>Response Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Option</TableHead>
                                    <TableHead>Count</TableHead>
                                    <TableHead>Percentage</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {getQuestionChartData(index).map(
                                    (data, i) => (
                                      <TableRow key={i}>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.value}</TableCell>
                                        <TableCell>
                                          {(
                                            (data.value /
                                              survey.responses.length) *
                                            100
                                          ).toFixed(2)}
                                          %
                                        </TableCell>
                                      </TableRow>
                                    ),
                                  )}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="mb-4 font-medium">{question.text}</h3>
                <ScrollArea className="w-full">
                  {question.type === "multiple-choice" ? (
                    <div className="w-[600px]">
                      <QuestionChart question={question} index={index} />
                    </div>
                  ) : (
                    <div className="max-h-[300px] w-full overflow-y-auto pr-4">
                      <QuestionAnswersList question={question} index={index} />
                    </div>
                  )}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getTotalResponsesChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getTotalResponsesChartData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="users" className="py-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>User Response Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          userResponseStatus.get(user.id)
                            ? "default"
                            : "destructive"
                        }
                      >
                        {userResponseStatus.get(user.id)
                          ? "Answered"
                          : "Not Answered"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedUser(user)}
                            disabled={!userResponseStatus.get(user.id)}
                          >
                            View Responses
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              {user.name}&apos;s Responses
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="mt-4 h-[calc(90vh-4rem)] pr-4">
                            {getUserResponses(user.id).map(
                              (response, index) => (
                                <Card
                                  key={response.questionId}
                                  className="mb-4"
                                >
                                  <CardHeader className="border-b">
                                    <CardTitle className="text-sm">
                                      Question {index + 1}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="p-4">
                                    <p className="mb-2 font-medium">
                                      {(survey.questions[index] as any).text}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Answer: {response.userResponse}
                                    </p>
                                  </CardContent>
                                </Card>
                              ),
                            )}
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SurveyResultsContent;
