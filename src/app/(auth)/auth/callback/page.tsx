// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { setCookie, deleteCookie, getCookie } from "js-cookie-helper";

// export default function AuthCallback() {
//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "loading"
//   );
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = getCookie("redirect-url");

//   useEffect(() => {
//     const handleAuth = async () => {
//       const token = searchParams.get("token");
//       const userType = searchParams.get("userType");

//       if (!token) {
//         setStatus("error");
//         return;
//       }

//       try {
//         // Set cookies
//         setCookie("auth-token", token);
//         setCookie("user-type", userType || "");

//         // Decode and store user information
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             id: payload.sub,
//             email: payload.email,
//             name: payload.name,
//             type: payload.type,
//           })
//         );

//         setStatus("success");

//         // Dispatch custom event to trigger profile fetch in AuthProvider
//         window.dispatchEvent(new CustomEvent("auth:success"));

//         // Redirect after a short delay to allow profile fetch
//         setTimeout(() => {
//           router.push(redirectUrl || "/");
//           router.refresh();
//         }, 1500);
//         deleteCookie("redirect-url");
//       } catch (error) {
//         console.error("Error processing token:", error);
//         setStatus("error");
//       }
//     };

//     handleAuth();
//   }, [router, redirectUrl, searchParams]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       {status === "loading" && <p>Authenticating...</p>}
//       {status === "success" && <p>Authentication successful! Redirecting...</p>}
//       {status === "error" && <p>Authentication failed.</p>}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie, deleteCookie, getCookie } from "js-cookie-helper";

export default function AuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = getCookie("redirect-url");

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get("token");
      const userType = searchParams.get("userType");

      if (!token) {
        setStatus("error");
        return;
      }

      try {
        // Set cookies
        setCookie("auth-token", token);
        setCookie("user-type", userType || "");

        // Decode and store user information
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

        // Dispatch custom event to trigger profile fetch in AuthProvider
        window.dispatchEvent(new CustomEvent("auth:success"));

        // Delete redirect-url cookie BEFORE redirecting

        // Redirect after a short delay to allow profile fetch
        setTimeout(() => {
          router.push(redirectUrl || "/");
          router.refresh();
        }, 1500);
        deleteCookie("redirect-url");
      } catch (error) {
        console.error("Error processing token:", error);
        setStatus("error");
      }
    };

    handleAuth();
  }, [router, redirectUrl, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {status === "loading" && <p>Authenticating...</p>}
      {status === "success" && <p>Authentication successful! Redirecting...</p>}
      {status === "error" && <p>Authentication failed.</p>}
    </div>
  );
}
