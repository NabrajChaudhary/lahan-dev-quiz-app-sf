import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { QuizResponse } from "../types/quiz.type";

export const getAllQuiz = async () => {
  const response = await executeFetch("/quiz/", {
    cache: "force-cache",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizResponse;
};

export const getQuizById = async (id: string) => {
  const response = await executeFetch(`/quiz/${id}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizResponse;
};
