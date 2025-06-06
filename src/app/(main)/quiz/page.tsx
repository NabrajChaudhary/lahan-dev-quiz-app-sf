import { getQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";
import { getAllQuiz } from "@/modules/dashboard/services/quiz.services";
import QuizCardBlock from "@/modules/quiz/components/QuizCardBlock";
import QuizCategory from "@/modules/quiz/components/QuizCategoryBlock";
import React from "react";

const QuizPage = async () => {
  const getActiveCategories = await getQuizCategories();
  const { data: categories } = getActiveCategories;
  const getQuizes = await getAllQuiz();
  console.log("🚀 ~ QuizPage ~ getQuizes:", getQuizes);

  // const [selectedCategory, setSelectedCategory] = React.useState("all");
  return (
    <div className="container mx-auto px-4 py-8 h-screen min-h-full ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Quiz Collection</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Choose a category and select a quiz to test your knowledge
        </p>

        <QuizCategory categories={categories} />
      </div>
      <QuizCardBlock quizes={getQuizes.data} />
    </div>
    // <div className="h-screen min-h-full flex justify-center">
    //   <div className="m-auto px-4 min-w-full  lg:min-w-[600px]">
    //     <QuizContainer />
    //   </div>
    // </div>
  );
};

export default QuizPage;
