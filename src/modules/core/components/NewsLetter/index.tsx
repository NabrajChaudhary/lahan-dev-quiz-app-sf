import React from "react";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";

const NewsLetter = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute top-4 right-2 -translate-y-1/4 translate-x-1/4">
          <Lightbulb className="h-56 w-56 text-primary/20" />
        </div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="max-w-[700px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students and knowledge enthusiasts who are
                expanding their horizons with LahanQuiz.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2 sm:flex-row">
                <input
                  className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button
                  type="submit"
                  className="sm:w-auto bg-white text-purple-600 hover:bg-white/90"
                >
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
