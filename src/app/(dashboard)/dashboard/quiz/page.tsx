import QuizModule from "@/modules/dashboard/page/quiz";
import { getAllQuiz } from "@/modules/dashboard/services/quiz.services";
import { cookies } from "next/headers";
import React from "react";

const QuizPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  const getQuiz = await getAllQuiz(token?.value);
  console.log("🚀 ~ QuizPage ~ getQuiz:", getQuiz);
  return <QuizModule data={getQuiz} />;
};

export default QuizPage;
