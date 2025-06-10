import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { QuizResponse, SingleQuizResponse } from "../types/quiz.type";

export const getAllQuiz = async (token?: string) => {
  const response = await executeFetch("/quiz/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["quiz"],
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizResponse;
};

export const getQuizesById = async (id?: string) => {
  const response = await executeFetch(`/quiz/${id}/category`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizResponse;
};

export const getQuizById = async (id: string, token?: string) => {
  const response = await executeFetch(`/quiz/${id}`, {
    cache: "force-cache",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as SingleQuizResponse;
};
