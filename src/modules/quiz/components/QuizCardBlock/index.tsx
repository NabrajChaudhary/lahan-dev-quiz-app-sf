// import { Badge } from '@/modules/core/components/ui/badge'
"use client";
import { Badge } from "@/modules/core/components/ui/badge";
import { Button } from "@/modules/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/ui/card";
import { formatTime } from "@/modules/core/utils/formatTime";
import { QuizTypes } from "@/modules/dashboard/types/quiz.type";
import { Clock, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  quizes: Array<QuizTypes>;
};

const QuizCardBlock = ({ quizes }: Props) => {
  const router = useRouter();

  const handleQuizSelect = (id: string) => {
    router.push(`/quiz/${id}`);
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizes.map((quiz) => (
          <Card key={quiz._id} className="hover:shadow-lg transition-shadow ">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-md mb-2">{quiz.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3 h-14">
                    {quiz.description}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Quiz Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(quiz.timeLimit)} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {/* <Users className="w-4 h-4" /> */}
                  {/* <span>{quiz.participants.toLocaleString()} participants</span> */}
                </div>

                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  {/* <Badge variant="outline" className="text-xs">
                    {categories.find((cat) => cat.id === quiz.category)?.name}
                  </Badge> */}
                </div>

                {/* Start Quiz Button */}
                <Button
                  className="w-full mt-4 cursor-pointer"
                  onClick={() => handleQuizSelect(quiz._id)}
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {quizes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No quizzes found in the selected category.
          </p>
        </div>
      )}
    </>
  );
};

export default QuizCardBlock;
