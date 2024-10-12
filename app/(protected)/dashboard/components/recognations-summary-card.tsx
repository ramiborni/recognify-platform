import Link from "next/link";
import { Recognition } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RecognitionWithReceiverAndSender } from "@/types";


interface RecognitionSummaryCardProps {
  recognitions: RecognitionWithReceiverAndSender[]
}

export default function RecognitionSummaryCard({ recognitions }: RecognitionSummaryCardProps) {
  if (recognitions.length === 0) {
    return <></>
  }

  const getBadgeColor = (points: number) => {
    if (points >= 100) return "bg-blue-200 text-blue-800 hover:bg-blue-300";
    if (points >= 50) return "bg-green-200 text-green-800 hover:bg-green-300";
    return "bg-yellow-200 text-yellow-800 hover:bg-yellow-300";
  };

  return (
    <Card className="flex size-full flex-col border border-dashed">
      <CardTitle className="px-6 pb-6 pt-8">Recent Recognitions</CardTitle>
      <CardContent className="grow px-6 pb-4">
        <div className="flex flex-col justify-start gap-y-4">
          {recognitions.map((recognition, index) => (
            <Link key={index} href={`/dashboard/recognitions/`}>
              <div className="flex flex-row items-center gap-x-4 rounded-lg p-2 transition duration-300 ease-in-out hover:bg-primary/10">
                <Avatar className="size-10">
                  <AvatarFallback>{recognition.giver!.name![0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-y-1">
                  <div className="flex flex-row items-center gap-x-2">
                    <h3 className="text-sm font-semibold">{recognition.giver.name} → {recognition.receiver.name}</h3>
                    <Badge className={getBadgeColor(recognition.points)}>
                      {recognition.points} pts
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">{recognition.message}</p>
                </div>
                <div className="flex-1"></div>
                <div className="shrink-0">
                  <ChevronRightIcon className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto px-6 pb-6">
        <Link href="/dashboard/recognitions/" className="w-full">
          <Button className="w-full">Give Recognition</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}