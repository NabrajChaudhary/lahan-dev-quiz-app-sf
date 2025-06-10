"use client";

import { useState, useEffect, useCallback } from "react";

// import { quizData } from "@/modules/core/data/quiz-data";
import { setCookie } from "js-cookie-helper";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import ResultsCard from "../ResultCard";
import Timer from "../Timer";
import QuestionCard from "../QuestionCard";
import { QuestionsItems } from "@/modules/dashboard/types/questions.type";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

type IProps = {
  quizData: Array<QuestionsItems>;
  quizId: string;
};
export default function QuizContainer({ quizData, quizId }: IProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [userName, setUserName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [timedOutQuestions, setTimedOutQuestions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/quiz";

  const pathname = usePathname(); // Gets the current path (e.g., /dashboard)

  const handleRedirect = () => {
    const encodedPath = encodeURIComponent(currentPath || pathname);
    router.push(`/login?redirect=${encodedPath}`);
  };

  // Use useCallback to memoize the handleTimeUp function
  const handleTimeUp = useCallback(() => {
    const currentQuestion = quizData[currentQuestionIndex];

    // Mark this question as timed out
    setTimedOutQuestions((prev) => [...prev, currentQuestion._id]);

    // Show feedback and then move to next question
    setAnswerChecked(true);
    setTimerActive(false);
    setShowFeedback(true);

    // Move to next question after delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  }, [currentQuestionIndex, quizData]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    if (answerChecked) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    // Check answer and show feedback
    setAnswerChecked(true);
    setTimerActive(false);
    setShowFeedback(true);

    // Move to next question after delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  const moveToNextQuestion = () => {
    setShowFeedback(false);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswerChecked(false);
      setTimerActive(true);
      setTimerReset((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizStarted(false);
    setAnswerChecked(false);
    setTimerReset((prev) => prev + 1);
    setTimerActive(true);
    setTimedOutQuestions([]);
    setShowFeedback(false);
    router.push("/quiz");
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((question) => {
      // Only count the score if the question didn't time out and the answer is correct
      if (
        !timedOutQuestions.includes(question._id) &&
        selectedAnswers[question._id] === question.correctAnswer
      ) {
        score += 1;
      }
    });
    return score;
  };

  const handleStartQuiz = () => {
    if (!userName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setQuizStarted(true);
    setCookie("username", userName);
  };

  // Reset timer when moving to a new question
  useEffect(() => {
    if (quizStarted && !quizCompleted && !showFeedback) {
      setTimerActive(true);
      setTimerReset((prev) => prev + 1);
    }
  }, [currentQuestionIndex, quizStarted, quizCompleted, showFeedback]);

  if (!quizStarted) {
    return (
      <Card className="w-full max-w-lg shadow-lg pt-0">
        <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg py-2">
          <CardTitle className="text-2xl font-bold">
            Welcome to the Quiz!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-center text-gray-700">
              Test your knowledge with this {quizData.length}-question quiz.
              You&apos;ll have 10 seconds for each question.
            </p>

            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md mt-2 mb-2">
              <p className="text-sm text-yellow-800">
                <strong>Caution:</strong> If you use AI tools or search engines
                to find answers, it&apos;s your responsibility. This quiz is
                designed to test your personal knowledge.
              </p>
            </div>

            {user ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={nameError ? "border-red-500" : ""}
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm">
                      Please enter your name to continue
                    </p>
                  )}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </Button>
              </>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                onClick={handleRedirect}
              >
                Goto Login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    return (
      <ResultsCard
        score={calculateScore()}
        totalQuestions={quizData.length}
        onRestart={handleRestartQuiz}
        userName={userName}
        submit={quizCompleted}
        quizId={quizId}
      />
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="w-full max-w-lg">
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </p>
      </div>

      <Timer
        duration={15}
        onTimeUp={handleTimeUp}
        isActive={timerActive}
        reset={timerReset}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswers[currentQuestion._id]}
        onAnswerSelect={handleAnswerSelect}
        answerChecked={answerChecked}
        isTimedOut={timedOutQuestions.includes(currentQuestion._id)}
        // showFeedback={showFeedback}
      />
    </div>
  );
}
