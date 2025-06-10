import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { QuizAttemptsResponse } from "../types/quiz-attempts.type";

export const getAllQuizAttempts = async (token?: string) => {
  const response = await executeFetch("/quiz/attempts/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["quiz-attempt"],
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizAttemptsResponse;
};

export const getAllQuizAttemptsByUser = async ({
  token,
  userID,
}: {
  token?: string;
  userID?: string;
}) => {
  const response = await executeFetch(`/quiz/${userID}/attempts/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["quiz-attempt"],
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuizAttemptsResponse;
};
