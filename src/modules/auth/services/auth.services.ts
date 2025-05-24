/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { executeFetch } from "@/lib/execute-fetch";

export const getGoogleLogin = async () => {
  const response = await executeFetch("/auth/google", {
    cache: "no-store",
    next: {
      tags: ["google"],
    },
  });
  if (!response.ok) {
    return notFound();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await response.json()) as any;
};

export const getProfile = async ({ token }: { token?: string }) => {
  if (!token) {
    console.log("No token provided. Skipping API call.");
    return null; // or throw an error or handle as needed
  }

  const response = await executeFetch("/auth/profile", {
    cache: "no-store",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as any;
};
