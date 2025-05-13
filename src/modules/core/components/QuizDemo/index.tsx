// "use client";

// import { useState } from "react";

// import { CheckCircle, XCircle, Clock } from "lucide-react";
// import { Progress } from "../ui/progress";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";

// export default function QuizDemo() {
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const correctAnswer = "kathmandu";

//   const handleSubmit = () => {
//     if (selectedAnswer) {
//       setIsSubmitted(true);
//     }
//   };

//   const resetQuiz = () => {
//     setSelectedAnswer(null);
//     setIsSubmitted(false);
//     setTimeLeft(30);
//   };

//   return (
//     <div className="rounded-xl border bg-white dark:bg-gray-950 p-6 shadow-xl relative overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-1">
//         <Progress value={(timeLeft / 30) * 100} className="h-1 rounded-none" />
//       </div>

//       <div className="mb-4 flex items-center justify-between">
//         <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm font-medium text-white shadow-sm">
//           Geography
//         </div>
//         <div className="flex items-center text-sm text-muted-foreground">
//           <Clock className="h-4 w-4 mr-1" />
//           <span>{timeLeft} seconds left</span>
//         </div>
//       </div>

//       <h3 className="mb-6 text-xl font-bold">
//         What is the capital city of Nepal?
//       </h3>

//       <RadioGroup
//         value={selectedAnswer || ""}
//         onValueChange={setSelectedAnswer}
//         className="mb-6 space-y-3"
//         disabled={isSubmitted}
//       >
//         {[
//           { value: "kathmandu", label: "Kathmandu" },
//           { value: "pokhara", label: "Pokhara" },
//           { value: "lalitpur", label: "Lalitpur" },
//           { value: "bhaktapur", label: "Bhaktapur" },
//         ].map((option) => (
//           <div
//             key={option.value}
//             className={`flex items-center rounded-lg border p-4 transition-all hover:border-purple-200 dark:hover:border-purple-800 ${
//               isSubmitted && option.value === correctAnswer
//                 ? "border-green-500 bg-green-50 dark:bg-green-950/20"
//                 : isSubmitted && option.value === selectedAnswer
//                 ? option.value !== correctAnswer
//                   ? "border-red-500 bg-red-50 dark:bg-red-950/20"
//                   : "border-green-500 bg-green-50 dark:bg-green-950/20"
//                 : selectedAnswer === option.value
//                 ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
//                 : ""
//             }`}
//           >
//             <RadioGroupItem
//               value={option.value}
//               id={option.value}
//               className="mr-3"
//             />
//             <Label
//               htmlFor={option.value}
//               className="flex-1 cursor-pointer font-medium"
//             >
//               {option.label}
//             </Label>
//             {isSubmitted && option.value === correctAnswer && (
//               <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
//             )}
//             {isSubmitted &&
//               option.value === selectedAnswer &&
//               option.value !== correctAnswer && (
//                 <XCircle className="ml-2 h-5 w-5 text-red-500" />
//               )}
//           </div>
//         ))}
//       </RadioGroup>

//       {isSubmitted ? (
//         <div className="space-y-4">
//           <div
//             className={`rounded-lg p-4 ${
//               selectedAnswer === correctAnswer
//                 ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
//                 : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
//             }`}
//           >
//             <p className="font-medium">
//               {selectedAnswer === correctAnswer
//                 ? "Correct! Kathmandu is the capital city of Nepal."
//                 : "Incorrect. The correct answer is Kathmandu, which is the capital city of Nepal."}
//             </p>
//             <p className="mt-2 text-sm">
//               Kathmandu is the largest city of Nepal and serves as the
//               country&apos;s political, economic, and cultural hub.
//             </p>
//           </div>
//           <Button
//             onClick={resetQuiz}
//             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
//           >
//             Try Another Question
//           </Button>
//         </div>
//       ) : (
//         <Button
//           onClick={handleSubmit}
//           disabled={!selectedAnswer}
//           className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
//         >
//           Submit Answer
//         </Button>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    category: "Geography",
    question: "What is the capital city of Nepal?",
    options: [
      { value: "kathmandu", label: "Kathmandu" },
      { value: "pokhara", label: "Pokhara" },
      { value: "lalitpur", label: "Lalitpur" },
      { value: "bhaktapur", label: "Bhaktapur" },
    ],
    correctAnswer: "kathmandu",
    explanation:
      "Kathmandu is the largest city of Nepal and serves as the country's political, economic, and cultural hub.",
  },
  {
    id: 2,
    category: "Science",
    question: "Which planet is known as the Red Planet?",
    options: [
      { value: "venus", label: "Venus" },
      { value: "mars", label: "Mars" },
      { value: "jupiter", label: "Jupiter" },
      { value: "saturn", label: "Saturn" },
    ],
    correctAnswer: "mars",
    explanation:
      "Mars appears red because its surface contains iron oxide, commonly known as rust.",
  },
  {
    id: 3,
    category: "History",
    question: "In which year did World War II end?",
    options: [
      { value: "1943", label: "1943" },
      { value: "1945", label: "1945" },
      { value: "1947", label: "1947" },
      { value: "1950", label: "1950" },
    ],
    correctAnswer: "1945",
    explanation:
      "World War II ended in 1945 with the surrender of Japan following the atomic bombings of Hiroshima and Nagasaki.",
  },
  {
    id: 4,
    category: "Literature",
    question: "Who wrote 'Pride and Prejudice'?",
    options: [
      { value: "jane_austen", label: "Jane Austen" },
      { value: "charles_dickens", label: "Charles Dickens" },
      { value: "emily_bronte", label: "Emily Brontë" },
      { value: "mark_twain", label: "Mark Twain" },
    ],
    correctAnswer: "jane_austen",
    explanation:
      "Pride and Prejudice was published in 1813 and is one of Jane Austen's most famous novels.",
  },
  {
    id: 5,
    category: "Technology",
    question: "Who is considered the founder of Microsoft?",
    options: [
      { value: "steve_jobs", label: "Steve Jobs" },
      { value: "bill_gates", label: "Bill Gates" },
      { value: "elon_musk", label: "Elon Musk" },
      { value: "mark_zuckerberg", label: "Mark Zuckerberg" },
    ],
    correctAnswer: "bill_gates",
    explanation:
      "Bill Gates co-founded Microsoft with Paul Allen in 1975, which became the world's largest PC software company.",
  },
];

export default function QuizDemo() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedbackTimer, setFeedbackTimer] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Timer effect for the question countdown
  useEffect(() => {
    if (isSubmitted || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, quizCompleted]);

  // Timer effect for showing feedback before moving to next question
  useEffect(() => {
    if (!isSubmitted || quizCompleted) return;

    const feedbackDuration = 15; // 15 seconds to show feedback
    setFeedbackTimer(feedbackDuration);

    const timer = setInterval(() => {
      setFeedbackTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          moveToNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, quizCompleted]);

  // Reset timer when moving to a new question
  useEffect(() => {
    if (!quizCompleted) {
      setTimeLeft(30);
    }
  }, [currentQuestionIndex, quizCompleted]);

  const handleSubmit = (isTimeout = false) => {
    if (isSubmitted) return;

    setIsSubmitted(true);

    // If answer is correct and not a timeout, increase score
    if (selectedAnswer === currentQuestion.correctAnswer && !isTimeout) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(30);
    setScore(0);
    setQuizCompleted(false);
  };

  // Render results screen when quiz is completed
  if (quizCompleted) {
    return (
      <div className="rounded-xl border bg-white dark:bg-gray-950 p-6 shadow-xl">
        <div className="text-center mb-6">
          <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-muted-foreground">
            You scored {score} out of {quizQuestions.length}
          </p>
          <div className="w-full mt-4 mb-6">
            <Progress
              value={(score / quizQuestions.length) * 100}
              className="h-2"
            />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {score === quizQuestions.length ? (
            <div className="rounded-lg p-4 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400">
              <p className="font-medium">Perfect Score! Congratulations!</p>
              <p className="mt-2 text-sm">
                You answered all questions correctly. Amazing job!
              </p>
            </div>
          ) : score >= quizQuestions.length / 2 ? (
            <div className="rounded-lg p-4 bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400">
              <p className="font-medium">Good Job!</p>
              <p className="mt-2 text-sm">
                You got more than half of the questions right. Keep learning!
              </p>
            </div>
          ) : (
            <div className="rounded-lg p-4 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">
              <p className="font-medium">Nice Try!</p>
              <p className="mt-2 text-sm">
                There&apos;s room for improvement. Try again to increase your
                score!
              </p>
            </div>
          )}
        </div>

        <Button
          onClick={restartQuiz}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-950 p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1">
        <Progress value={(timeLeft / 30) * 100} className="h-1 rounded-none" />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm font-medium text-white shadow-sm">
          {currentQuestion.category}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1}/{quizQuestions.length}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>
              {isSubmitted ? `Next: ${feedbackTimer}s` : `${timeLeft}s left`}
            </span>
          </div>
        </div>
      </div>

      <h3 className="mb-6 text-xl font-bold">{currentQuestion.question}</h3>

      <RadioGroup
        value={selectedAnswer || ""}
        onValueChange={setSelectedAnswer}
        className="mb-6 space-y-3"
        disabled={isSubmitted}
      >
        {currentQuestion.options.map((option) => (
          <div
            key={option.value}
            className={`flex items-center rounded-lg border p-4 transition-all hover:border-purple-200 dark:hover:border-purple-800 ${
              isSubmitted && option.value === currentQuestion.correctAnswer
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : isSubmitted && option.value === selectedAnswer
                ? option.value !== currentQuestion.correctAnswer
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                  : "border-green-500 bg-green-50 dark:bg-green-950/20"
                : selectedAnswer === option.value
                ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                : ""
            }`}
          >
            <RadioGroupItem
              value={option.value}
              id={`${currentQuestionIndex}-${option.value}`}
              className="mr-3"
            />
            <Label
              htmlFor={`${currentQuestionIndex}-${option.value}`}
              className="flex-1 cursor-pointer font-medium"
            >
              {option.label}
            </Label>
            {isSubmitted && option.value === currentQuestion.correctAnswer && (
              <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
            )}
            {isSubmitted &&
              option.value === selectedAnswer &&
              option.value !== currentQuestion.correctAnswer && (
                <XCircle className="ml-2 h-5 w-5 text-red-500" />
              )}
          </div>
        ))}
      </RadioGroup>

      {isSubmitted ? (
        <div className="space-y-4">
          <div
            className={`rounded-lg p-4 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
            }`}
          >
            <p className="font-medium">
              {selectedAnswer === currentQuestion.correctAnswer
                ? `Correct! ${
                    currentQuestion.options.find(
                      (o) => o.value === currentQuestion.correctAnswer
                    )?.label
                  } is the right answer.`
                : `Incorrect. The correct answer is ${
                    currentQuestion.options.find(
                      (o) => o.value === currentQuestion.correctAnswer
                    )?.label
                  }.`}
            </p>
            <p className="mt-2 text-sm">{currentQuestion.explanation}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Moving to next question in {feedbackTimer} seconds...
            </div>
            <Button
              onClick={moveToNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
            >
              Next Question
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => handleSubmit()}
          disabled={!selectedAnswer}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
        >
          Submit Answer
        </Button>
      )}

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            Score: {score}/{quizQuestions.length}
          </div>
          <div className="w-32">
            <Progress
              value={(currentQuestionIndex / quizQuestions.length) * 100}
              className="h-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
