import { executeFetch } from "@/lib/execute-fetch";
import { notFound } from "next/navigation";
import { PostsResponse } from "../types/posts.types";

export const getPosts = async () => {
  const response = await executeFetch("/posts/", {
    cache: "no-store",
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as PostsResponse;
};

export const getAllPost = async (token?: string) => {
  const response = await executeFetch("/posts/all", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as PostsResponse;
};
