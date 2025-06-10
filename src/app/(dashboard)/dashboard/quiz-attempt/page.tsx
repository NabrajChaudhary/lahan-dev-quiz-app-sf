import QuizAttemptModule from "@/modules/dashboard/page/quiz-attempts";
import { getAllQuizAttempts } from "@/modules/dashboard/services/quiz-attempt.services";
import { cookies } from "next/headers";
import React from "react";

const QuizAttemptPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  const getQuizAttempts = await getAllQuizAttempts(token?.value);
  return <QuizAttemptModule data={getQuizAttempts} />;
};

export default QuizAttemptPage;
