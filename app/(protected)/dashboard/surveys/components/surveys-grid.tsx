"use client"

import React from "react"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { Survey } from "@prisma/client"


interface SurveysGridProps {
  surveys: Survey[]
}

const SurveysGrid: React.FC<SurveysGridProps> = ({ surveys }) => {
  const getStatusColor = (status: Survey["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200 text-yellow-800"
      case "ACTIVE":
        return "bg-green-200 text-green-800"
      case "COMPLETED":
        return "bg-blue-200 text-blue-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surveys.map((survey) => (
        <Card key={survey.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-lg font-semibold truncate">{survey.title}</span>
              <Badge className={getStatusColor(survey.status)}>{survey.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-500 mb-2">
              Created on {format(survey.createdAt, "MMM d, yyyy")}
            </p>
            <p className="text-sm mb-2">
              {survey.questions.length} question{survey.questions.length !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {survey.questions[0]}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default SurveysGrid