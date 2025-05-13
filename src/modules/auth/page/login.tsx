"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/modules/core/components/ui/card";
import { Button } from "@/modules/core/components/ui/button";
import { NEXT_PUBLIC_API_URL } from "@/constants/env.constant";

export default function SignInForm() {
  console.log("🚀 ~ NEXT_PUBLIC_API_URL:", NEXT_PUBLIC_API_URL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      // Redirect to the Express backend's Google auth route
      window.location.href = `${NEXT_PUBLIC_API_URL}/auth/google`;

      // Note: The redirect will happen, so the code below won't execute immediately
      // It will only run if there's an error with the redirect
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast("Something went wrong");
    }
  };

  const handleGuestContinue = () => {
    router.push("/");
    toast("Continuing as guest");
  };

  return (
    <div className="grid gap-6">
      <Card className="p-5 flex flex-col space-y-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-0 shadow-md">
        <div className="text-sm text-center text-muted-foreground">
          Sign in with your Google account to access your personalized quiz
          dashboard
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="bg-white hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-700"
        >
          {/* {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "} */}
          Sign in with Google
        </Button>
      </Card>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid gap-1">
          <Button
            onClick={handleGuestContinue}
            variant="ghost"
            className="border border-input"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}
