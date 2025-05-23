"use client";

import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userName: string;
}

export default function ResultsCard({
  score,
  totalQuestions,
  onRestart,
  userName,
}: ResultsCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = "";
  let icon = null;

  if (percentage >= 80) {
    message = "Excellent! You're a quiz master!";
    icon = <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />;
  } else if (percentage >= 60) {
    message = "Good job! You know your stuff!";
    icon = <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />;
  } else if (percentage >= 40) {
    message = "Not bad, but there's room for improvement.";
    icon = <CheckCircle2 className="h-16 w-16 text-yellow-500 mx-auto mb-4" />;
  } else {
    message = "Keep studying and try again!";
    icon = <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
  }

  return (
    <Card className="w-full max-w-lg shadow-lg py-0">
      <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
        <CardDescription className="text-white text-lg">
          {userName}&apos;s Score: {score} out of {totalQuestions}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="py-6">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold">Congratulations, {userName}!</h3>
          </div>

          {icon}
          <div className="relative h-24 w-24 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <svg className="h-24 w-24" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className="text-purple-500"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
                strokeDasharray={`${percentage * 2.64}, 264`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <p className="text-xl font-medium mb-6">{message}</p>
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
