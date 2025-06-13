import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TwoColumnBlock = () => {
  return (
    <section className="w-full flex justify-center py-12 md:py-24 bg-gradient-to-br from-purple-50 via-background to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 mt-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md">
              # Open Source Quiz Application
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Learn, Challenge, Grow
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Expand your knowledge with fun, interactive quizzes designed for
              students and curious minds. Challenge yourself, compete with
              friends, and track your progress.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all hover:shadow-xl"
              >
                <Link
                  href="/quiz"
                  className="flex justify-between items-center"
                >
                  {" "}
                  Start quiz <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 dark:border-purple-800"
              >
                <Link href="#explore_categories">Explore Subjects</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>15,000+ MCQs</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Updated 2025 Syllabus</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free Access</span>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-4 w-full max-w-[650px] lg:max-w-none relative">
            <div className="absolute"></div>
            <Image
              src="/bg_one.png"
              alt="Nepalese students studying with the quiz app"
              width={600}
              height={600}
              className="relative w-full rounded-lg object-cover "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnBlock;
