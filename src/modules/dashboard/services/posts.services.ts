import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { ReviewResponse } from "../types/review.type";

export const getAllPosts = async () => {
  const response = await executeFetch("/feedback/", {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as ReviewResponse;
};
