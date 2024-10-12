"use client"

import React, { useState } from "react"
import { Survey, Feedback, User } from "@prisma/client"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Maximize2 } from "lucide-react"

interface SurveyResultsContentProps {
  survey: Survey & { responses: Feedback[] }
  allUsers: User[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#a05195', '#d45087', '#f95d6a', '#ff7c43']

const SurveyResultsContent: React.FC<SurveyResultsContentProps> = ({ survey, allUsers }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const getQuestionChartData = (questionIndex: number) => {
    const question = survey.questions[questionIndex] as any
    const data: { [key: string]: number } = {}

    if (question.type === "multiple-choice") {
      question.options.forEach((option: string) => {
        data[option] = 0
      })
    }

    survey.responses.forEach((response) => {
      const answers = response.responses as { questionId: string; userResponse: string }[]
      const answer = answers.find(a => a.questionId === question.id)
      if (answer) {
        if (data[answer.userResponse] !== undefined) {
          data[answer.userResponse]++
        } else {
          data[answer.userResponse] = 1
        }
      }
    })

    return Object.entries(data).map(([name, value]) => ({ name, value }))
  }

  const getTotalResponsesChartData = () => {
    const totalResponses = survey.responses.length
    const totalUsers = allUsers.length
    return [
      { name: "Answered", value: totalResponses },
      { name: "Not Answered", value: totalUsers - totalResponses }
    ]
  }

  const getUserResponseStatus = () => {
    const responseStatus = new Map<string, boolean>()
    allUsers.forEach((user) => {
      responseStatus.set(user.id, false)
    })
    survey.responses.forEach((response) => {
      responseStatus.set(response.userId, true)
    })
    return responseStatus
  }

  const userResponseStatus = getUserResponseStatus()

  const getUserResponses = (userId: string) => {
    return survey.responses.find((response) => response.userId === userId)?.responses as { questionId: string; userResponse: string }[] || []
  }

  const QuestionChart = ({ question, index, height = 300 }: { question: any, index: number, height?: number }) => (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={getQuestionChartData(index)}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {getQuestionChartData(index).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

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
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Maximize2 className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Question {index + 1}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[calc(90vh-4rem)] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-semibold">{question.text}</h3>
                          <p className="mb-4 text-sm text-muted-foreground">
                            Total Responses: {survey.responses.length}
                          </p>
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Response Distribution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <QuestionChart question={question} index={index} height={400} />
                          </CardContent>
                        </Card>
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
                                {getQuestionChartData(index).map((data, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.value}</TableCell>
                                    <TableCell>
                                      {((data.value / survey.responses.length) * 100).toFixed(2)}%
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="mb-4 font-medium">{question.text}</h3>
                <ScrollArea className="w-full">
                  <div className="w-[600px]">
                    <QuestionChart question={question} index={index} />
                  </div>
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getTotalResponsesChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                      <Badge variant={userResponseStatus.get(user.id) ? "default" : "destructive"}>
                        {userResponseStatus.get(user.id) ? "Answered" : "Not Answered"}
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
                            <DialogTitle>{user.name}&apos;s Responses</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="mt-4 h-[calc(90vh-4rem)] pr-4">
                            {getUserResponses(user.id).map((response, index) => (
                              <Card key={response.questionId} className="mb-4">
                                <CardHeader className="border-b">
                                  <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                  <p className="mb-2 font-medium">{(survey.questions[index] as any).text}</p>
                                  <p className="text-sm text-muted-foreground">Answer: {response.userResponse}</p>
                                </CardContent>
                              </Card>
                            ))}
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
  )
}

export default SurveyResultsContent