import SignInForm from "@/modules/auth/page/login";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const LoginPage = () => {
  //   const loginPageData = await getGoogleLogin();
  //   console.log("🚀 ~ LoginPage ~ loginPageData:", loginPageData);
  //   console.log("🚀 ~ LoginPage ~ loginPageData:", loginPageData);
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <BookOpen className="mr-2 h-6 w-6" />
          <Link href="/" className="flex items-center">
            LahanQuiz
          </Link>
        </div>
        <div className="relative z-20 mt-auto"></div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1/3 bg-gradient-to-t from-purple-900/80 to-transparent" />
        {/* <Image
          src="/nepali-students-studying.png"
          alt="Students studying"
          fill
          className="absolute inset-0 object-cover z-0 opacity-30"
        /> */}
        <Image
          src="/nepali-students-studying.png"
          alt="Students studying"
          fill
          className="absolute inset-0 object-cover z-0 opacity-30"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue your exam preparation
            </p>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
