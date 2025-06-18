import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { QuestionsResponse } from "../types/questions.type";

export const getQuestions = async ({
  page,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await executeFetch(`/questions?page=${page}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuestionsResponse;
};
