"use client";
import { cn } from "@/lib/utils";
import { CategoryItems } from "@/modules/dashboard/types/quiz-categories.type";
import React from "react";

type Props = {
  categories: Array<CategoryItems>;
};

const QuizCategory = ({ categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  //   const handleQuizSelect = (quizId: number) => {
  //     console.log(`Selected quiz with ID: ${quizId}`);
  //     // Here you would typically navigate to the quiz or fetch quiz details
  //     alert(`Quiz ID ${quizId} selected!`);
  //   };

  const filteredQuizzes =
    selectedCategory === "all"
      ? categories
      : categories.filter((quiz) => quiz.category_slug === selectedCategory);

  return (
    <>
      <div className="w-full border-b mb-6">
        <nav
          className="flex space-x-1 overflow-x-auto pb-2"
          aria-label="Categories"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ",
                selectedCategory === category._id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {category.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {selectedCategory === "all" ? (
            <>Showing all {filteredQuizzes.length} quizzes</>
          ) : (
            <>
              Showing {filteredQuizzes.length} quiz
              {filteredQuizzes.length !== 1 ? "es" : ""} in{" "}
              <span className="font-medium">
                {categories.find((cat) => cat._id === selectedCategory)?.title}
              </span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default QuizCategory;
