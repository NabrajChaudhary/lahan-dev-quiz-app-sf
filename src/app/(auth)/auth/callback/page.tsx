"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "js-cookie-helper";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userType = searchParams.get("userType");
    const redirectTo = searchParams.get("redirect");
    console.log("🚀 ~ useEffect ~ redirectTo:", redirectTo);

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
      setTimeout(() => {
        // Check for redirect parameter from URL
        const redirectUrl = searchParams.get("redirect");

        router.push(redirectUrl || redirectTo || "/");
      }, 1500);
    } catch (error) {
      console.error("Error processing token:", error);
      setStatus("error");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {status === "loading" && <p>Authenticating...</p>}
      {status === "success" && <p>Authentication successful! Redirecting...</p>}
      {status === "error" && <p>Authentication failed.</p>}
    </div>
  );
}
