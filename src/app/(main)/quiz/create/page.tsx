import CreateQuizForm from "@/modules/quiz/pages/CreateQuiz";
import { getAllCategories } from "@/modules/quiz/services/quiz-services";
import React from "react";

const CreateQuiz = async () => {
  const getAllActiveCategories = await getAllCategories();
  console.log(
    "🚀 ~ CreateQuiz ~ getAllActiveCategories:",
    getAllActiveCategories
  );
  return <CreateQuizForm categories={getAllActiveCategories.data || []} />;
};

export default CreateQuiz;
