import AiQuestionGenerator from "@/modules/dashboard/page/AiQuestionGenerator";
import { getQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";
import React from "react";

const QuestionGeneratorPage = async () => {
  const quizCategory = await getQuizCategories();
  return (
    <>
      <AiQuestionGenerator categoryOptions={quizCategory?.data || []} />
    </>
  );
};

export default QuestionGeneratorPage;
