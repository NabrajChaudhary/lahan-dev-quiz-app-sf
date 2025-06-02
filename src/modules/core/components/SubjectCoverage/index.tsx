import { getQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";
import React from "react";

const SubjectCoverage = async () => {
  const categories = await getQuizCategories();
  return (
    <section
      className="w-full py-12 md:py-24 bg-gradient-to-br from-purple-50 via-background to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20"
      id="explore_categories"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white font-medium shadow-md">
              Comprehensive Coverage
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              All Subjects Covered
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Practice with thousands of MCQs across all major topics
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {categories.data.map((item, index: number) => (
            <div
              key={index}
              className={`flex items-center justify-center rounded-lg bg-white dark:bg-gray-950 p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 ${
                index % 3 === 0
                  ? "border-purple-500"
                  : index % 3 === 1
                  ? "border-blue-500"
                  : "border-pink-500"
              }`}
            >
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectCoverage;
