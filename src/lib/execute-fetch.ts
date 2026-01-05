import { NEXT_PUBLIC_API_URL } from "@/constants/env.constant";

export const executeFetch = async (
  url: `/${string}`,
  init?: RequestInit
): Promise<Response> => {

  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, init);
  return response;
};
