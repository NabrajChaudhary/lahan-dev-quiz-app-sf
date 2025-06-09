import QuizForm from "@/modules/dashboard/components/CreateQuizForm";
import { getQuizCategories } from "@/modules/dashboard/services/quiz-categories.services";
import React from "react";

const AddQuiz = async () => {
  const quizCategory = await getQuizCategories();
  return <QuizForm categoryOptions={quizCategory?.data || []} />;
};

export default AddQuiz;
