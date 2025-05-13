"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { setCookie } from "js-cookie-helper";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log("🚀 ~ AuthCallback ~ searchParams:", searchParams);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const token = searchParams.get("token");
    const userType = searchParams.get("userType");
    console.log("🚀 ~ useEffect ~ userType:", userType);

    if (!token) {
      setStatus("error");
      return;
    }

    setCookie("auth-token", token);
    setCookie("user-type", userType || "");

    // You can also decode and store user information
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          type: payload.type,
        })
      );

      setStatus("success");

      // Redirect to dashboard or home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Error processing token:", error);
      setStatus("error");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {status === "loading" && "Completing Sign In..."}
          {status === "success" && "Sign In Successful!"}
          {status === "error" && "Authentication Error"}
        </h1>

        {status === "loading" && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          </div>
        )}

        {status === "success" && (
          <p className="text-center text-green-600">
            You have successfully signed in. Redirecting to your dashboard...
          </p>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="mb-4 text-red-600">
              There was a problem authenticating your account.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
