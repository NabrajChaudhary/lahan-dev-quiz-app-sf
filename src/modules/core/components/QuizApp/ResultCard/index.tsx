"use client";
import React from "react";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import Link from "next/link";

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userName: string;
  submit: boolean;
  quizId: string;
}

export default function ResultsCard({
  score,
  totalQuestions,
  onRestart,
  userName,
  submit = false,
  quizId,
}: ResultsCardProps) {
  const router = useRouter();

  const percentage = Math.round((score / totalQuestions) * 100);
  const { user } = useAuth();

  let message = "";
  let icon = null;

  const hasSubmittedRef = React.useRef(false);

  React.useEffect(() => {
    if (!submit || hasSubmittedRef.current || !user?.id) return;

    hasSubmittedRef.current = true; // Prevent re-submission

    const quizSubmitPayload = {
      user: user.id,
      quiz: quizId,
      score,
      scoreInPercentage: percentage,
    };

    publicAxios
      .post("/quiz/attempt", quizSubmitPayload)
      .then((res) => {
        toast.success(res.data.message);
        // router.push("/quiz");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Something went wrong");
      });
  }, [submit, user?.id, quizId, score, percentage, router]);

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
          <p className="text-lg font-medium mb-6">{message}</p>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Link href="/feedback">Give Feedback</Link>
          </Button>

          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Return to quizes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
