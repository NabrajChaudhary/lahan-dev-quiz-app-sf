/* eslint-disable @typescript-eslint/no-explicit-any */
import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";

export const getAllCategories = async () => {
  const response = await executeFetch("/categories/", {
    cache: "no-store",
  });

  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as any;
};
