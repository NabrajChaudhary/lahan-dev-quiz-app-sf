import QuizModule from "@/modules/dashboard/page/quiz";
import { getAllQuiz } from "@/modules/dashboard/services/quiz.services";
import React from "react";

const QuizPage = async () => {
  const getQuiz = await getAllQuiz();
  return <QuizModule data={getQuiz} />;
};

export default QuizPage;
