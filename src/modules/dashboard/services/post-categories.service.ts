import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { PostCategoryResponse } from "../types/post-categories.type";

export const getPostCategories = async () => {
  const response = await executeFetch("/posts/category/all", {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as PostCategoryResponse;
};

export const getAllPostCategories = async (token?: string) => {
  const response = await executeFetch("/posts/category/all", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as PostCategoryResponse;
};
