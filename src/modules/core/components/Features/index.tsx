import { BarChart, BookOpen, Clock, Target } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why choose LahanQuiz?
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines learning with fun, making knowledge
              retention easier and more enjoyable for students and lifelong
              learners alike.
            </p>
          </div>
        </div>
        <div className="mx-auto grid  items-center gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-950 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-purple-500">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-md">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Learn Effectively</h3>
            <p className="text-center text-muted-foreground">
              Research-backed quiz formats designed to improve knowledge
              retention and understanding.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-950 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-blue-500">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3 shadow-md">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Realistic Exam Simulation</h3>
            <p className="text-center text-muted-foreground">
              Practice under timed conditions that perfectly match the actual
              exam environment.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-950 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-pink-500">
            <div className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 p-3 shadow-md">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Compete & Challenge</h3>
            <p className="text-center text-muted-foreground">
              Challenge friends, classmates or random opponents to test your
              knowledge and skills.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-950 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border-t-4 border-purple-500">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 shadow-md">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Adaptive Learning</h3>
            <p className="text-center text-muted-foreground">
              Our system adapts to your performance, focusing on areas where you
              need improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
