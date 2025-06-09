"use client";

import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { QuestionsItems } from "@/modules/dashboard/types/questions.type";

interface QuestionCardProps {
  question: QuestionsItems;
  selectedAnswer: string;
  onAnswerSelect: (questionId: string, answerId: string) => void;
  answerChecked: boolean;
  isTimedOut: boolean;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  answerChecked,
  isTimedOut,
}: QuestionCardProps) {
  return (
    <Card className="shadow-lg py-0 w-full">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl py-3">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isTimedOut && answerChecked && (
          <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-md flex items-center">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            <p className="text-orange-700">
              Time&lsquo;s up! No points awarded for this question.
            </p>
          </div>
        )}

        <RadioGroup
          value={selectedAnswer}
          onValueChange={(value) => onAnswerSelect(question._id, value)}
          className="space-y-3"
        >
          {question.options.map((answer) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === question.correctAnswer;
            const isWrong =
              isSelected && !isCorrect && answerChecked && !isTimedOut;

            let borderClass = "border";
            let bgClass = "hover:bg-gray-50";

            // Only show correct/incorrect styling if not timed out
            if (answerChecked && !isTimedOut) {
              if (isCorrect) {
                borderClass = "border-2 border-green-500";
                bgClass = "bg-green-50";
              } else if (isWrong) {
                borderClass = "border-2 border-red-500";
                bgClass = "bg-red-50";
              }
            } else if (isSelected) {
              borderClass = "border-purple-500";
              bgClass = "bg-purple-50";
            }

            // If timed out, use neutral styling
            if (isTimedOut && answerChecked) {
              borderClass = "border";
              bgClass = "bg-gray-50";
            }

            return (
              <div
                key={answer}
                className={`flex items-center space-x-2 rounded-lg ${borderClass} p-4 cursor-pointer transition-all duration-200 ${bgClass}`}
                onClick={() =>
                  !answerChecked && onAnswerSelect(question._id, answer)
                }
              >
                <RadioGroupItem
                  value={answer}
                  id={answer}
                  className={
                    isCorrect && answerChecked && !isTimedOut
                      ? "text-green-600"
                      : isWrong
                      ? "text-red-600"
                      : "text-purple-600"
                  }
                  disabled={answerChecked}
                />
                <Label
                  htmlFor={answer}
                  className="flex-grow cursor-pointer font-medium"
                >
                  {answer}
                </Label>
                {answerChecked && !isTimedOut && isCorrect && (
                  <span className="text-green-500 ml-2">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                )}
                {answerChecked && !isTimedOut && isWrong && (
                  <span className="text-red-500 ml-2">
                    <XCircle className="h-5 w-5" />
                  </span>
                )}
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
