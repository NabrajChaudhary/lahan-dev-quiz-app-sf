import { getQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";
import {
  getAllQuiz,
  getQuizesById,
} from "@/modules/dashboard/services/quiz.services";
import QuizCardBlock from "@/modules/quiz/components/QuizCardBlock";
import QuizCategory from "@/modules/quiz/components/QuizCategoryBlock";
import React from "react";

const QuizPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const categoryId = (await searchParams).category;

  const getActiveCategories = await getQuizCategories();
  const { data: categories } = getActiveCategories;
  // Fetch quizzes based on category selection
  let quizzesData;
  if (categoryId) {
    // Fetch quizzes for specific category
    const categoryQuizzesResponse = await getQuizesById(categoryId);
    quizzesData = categoryQuizzesResponse.data;
  } else {
    // Fetch all quizzes when no category is selected
    const allQuizzesResponse = await getAllQuiz();
    quizzesData = allQuizzesResponse.data;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-auto min-h-full ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Quiz Collection</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Choose a category and select a quiz to test your knowledge
        </p>

        <QuizCategory categories={categories} />
      </div>
      <QuizCardBlock quizes={quizzesData} />
    </div>
  );
};

export default QuizPage;
