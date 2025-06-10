import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { QuizAttemptsItem } from "@/modules/dashboard/types/quiz-attempts.type";
import React from "react";

const QuizStatistics = ({ data }: { data: Array<QuizAttemptsItem> }) => {
  console.log("🚀 ~ QuizStatistics ~ data:", data);
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Quiz Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Quizzes</span>
          <span className="font-semibold">{data.length || 0}</span>
        </div>
        {/* <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Average Score</span>
          <span className="font-semibold">{data.averageScore}%</span>
        </div> */}
        {/* <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Best Score</span>
          <span className="font-semibold">{data.bestScore}%</span>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default QuizStatistics;
