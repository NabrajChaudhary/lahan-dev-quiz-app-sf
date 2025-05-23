import React from "react";
import HowItWorksStep from "./HowItWorkStep";

const QuizSteps = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md my-2">
            steps
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl py-3">
            How LahanQuiz Works
          </h2>
          <p className="text-gray-600">
            Getting started is easy. Follow these simple steps to begin your
            learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <HowItWorksStep
            number={1}
            title="Create an Account"
            description="Sign up for free and create your personal profile to track your progress."
          />
          <HowItWorksStep
            number={2}
            title="Choose a Category"
            description="Browse through our extensive library of quiz categories and topics."
          />
          <HowItWorksStep
            number={3}
            title="Take Quizzes"
            description="Answer questions, learn new facts, and challenge your knowledge."
          />
          <HowItWorksStep
            number={4}
            title="Track Progress"
            description="Monitor your improvement, earn badges, and compare with friends."
          />
        </div>
      </div>
    </section>
  );
};

export default QuizSteps;
