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
