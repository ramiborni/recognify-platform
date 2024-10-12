import Link from "next/link";
import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UpgradeCard() {
  return (
    <Card className="md:max-xl:rounded-none md:max-xl:border-none md:max-xl:shadow-none">
      <CardHeader className="md:max-xl:px-4">
        <CardTitle>Provide us a Feedback</CardTitle>
        <CardDescription>
          Help us improve our product by providing us with your feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="md:max-xl:px-4">
        <Link href="https://senja.io/p/recognify/r/YU81gZ">
          <Button size="sm" className="w-full">
            <HeartIcon className="mr-2 size-4" />
            Feedback
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
