import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { formatDate } from "@/modules/core/utils/formatTime";
import { QuizAttemptsItem } from "@/modules/dashboard/types/quiz-attempts.type";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentQuizes = ({ data }: { data: Array<QuizAttemptsItem> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Quizzes
        </CardTitle>
        <CardDescription>Your latest quiz attempts and scores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.quiz.title}</h4>
                <p className="text-sm text-gray-600">
                  {formatDate(item.attemptedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getDifficultyColor(item.quiz.difficulty)}>
                  {item.quiz.difficulty}
                </Badge>
                <div className="text-right">
                  <div className="font-semibold text-lg">
                    {item.scoreInPercentage}%
                  </div>
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <>
              <CardTitle className="text-xl text-center">
                Start your first quiz to see your progress here!
              </CardTitle>
              <div className="w-full flex justify-center">
                <Button className="text-center">
                  <Link href="/quiz">Goto Quizes</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentQuizes;
