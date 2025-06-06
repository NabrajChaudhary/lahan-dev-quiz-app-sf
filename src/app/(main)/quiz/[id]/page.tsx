import { Badge } from "@/modules/core/components/ui/badge";
import { formatTime } from "@/modules/core/utils/formatTime";
import { getQuizById } from "@/modules/dashboard/services/quiz.services";
import { Clock } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";

const QuizPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  const getQuiz = await getQuizById((await params).id, token?.value);
  const { data: quiz } = getQuiz;
  console.log("🚀 ~ QuizPage ~ quiz:", quiz);
  return (
    <div className="container mx-auto px-4 py-8 h-screen min-h-full">
      {/* Quiz Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <p className="text-muted-foreground mt-2">{quiz.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-primary/10">
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}{" "}
            Difficulty
          </Badge>
          <Badge variant="outline" className="bg-primary/10">
            {quiz.questions.length} Questions
          </Badge>
          <Badge
            variant="outline"
            className="bg-primary/10 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            {formatTime(quiz.timeLimit)} Time Limit
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
