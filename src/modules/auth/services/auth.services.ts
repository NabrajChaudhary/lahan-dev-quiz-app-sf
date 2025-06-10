import { notFound } from "next/navigation";
import { executeFetch } from "@/lib/execute-fetch";
import { ProfileResponse } from "@/modules/profile/types/user-profile.type";

export const getGoogleLogin = async () => {
  const response = await executeFetch("/auth/google", {
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

export const getProfile = async (token?: string) => {
  if (!token) {
    return null; // or throw an error or handle as needed
  }

  const response = await executeFetch("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["google"],
    },
  });

  if (!response.ok) {
    return notFound();
  }

  return (await response.json()) as ProfileResponse;
};
