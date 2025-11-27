import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/modules/core/components/ui/sonner";
// import { cookies } from "next/headers";
// import { getProfile } from "@/modules/auth/services/auth.services";
import AuthProvider from "@/modules/auth/providers/AuthProvider";
import GoogleAdsense from "@/modules/core/components/GoogleAdsene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LahanQuiz | Interactive Online Quizzes for Learning & Fun",
  description:
    "Expand your knowledge with our open-source quiz application. Discover engaging quizzes for students, test your skills, and learn something new today!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("auth-token");
  // const auth = await getProfile(token?.value);
  return (
    <html lang="en">
      {/* <GoogleAdsense pId="7140211619056785" /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
