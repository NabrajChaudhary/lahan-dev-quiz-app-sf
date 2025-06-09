"use client";
import { cn } from "@/lib/utils";
import { CategoryItems } from "@/modules/dashboard/types/quiz-categories.type";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  categories: Array<CategoryItems>;
};

const QuizCategory = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [isPending, startTransition] = useTransition();

  // const handleCategoryChange = (categoryId: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   setSelectedCategory(categoryId);
  //   if (categoryId === "all") {
  //     params.delete("category");
  //   } else {
  //     params.set("category", categoryId);
  //   }

  //   // Update the URL without refreshing the page
  //   router.push(`?${params.toString()}`, { scroll: false });
  // };

  const handleCategoryChange = (categoryId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      setSelectedCategory(categoryId || "all");
      if (categoryId === "all") {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }

      // Update the URL without refreshing the page
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <>
      <div className="w-full border-b mb-6">
        <nav
          className="flex space-x-1 overflow-x-auto pb-2"
          aria-label="Categories"
        >
          <button
            onClick={() => handleCategoryChange("all")}
            disabled={isPending}
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
              onClick={() => handleCategoryChange(category._id)}
              disabled={isPending}
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
        {/* <p className="text-sm text-muted-foreground">
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
        </p> */}
      </div>
    </>
  );
};

export default QuizCategory;
