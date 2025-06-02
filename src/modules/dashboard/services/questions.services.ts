import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { QuestionsResponse } from "../types/questions.type";

export const getQuestions = async () => {
  const response = await executeFetch("/questions/", {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as QuestionsResponse;
};
