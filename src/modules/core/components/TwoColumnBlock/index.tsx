import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

const TwoColumnBlock = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-background to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md">
              #1 Exam Prep App in Nepal
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Ace Your Entrance Exams
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Thousands of MCQs tailored specifically for CTEVT courses and Plus
              Two examinations in Nepal. Practice, learn, and succeed.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all hover:shadow-xl"
              >
                Start Practicing Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 dark:border-purple-800"
              >
                Explore Subjects
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
          <div className="mx-auto w-full max-w-[500px] lg:max-w-none relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-md opacity-75"></div>
            <Image
              src="/placeholder.svg?key=xgkn6"
              alt="Nepalese students studying with the quiz app"
              width={600}
              height={600}
              className="relative w-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnBlock;
