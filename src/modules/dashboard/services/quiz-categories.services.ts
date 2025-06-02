import { CategoryResponse } from "./../types/quiz-categories.type";
import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";

export const getQuizCategories = async () => {
  const response = await executeFetch("/categories/", {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as CategoryResponse;
};
