import QuestionsList from "@/modules/dashboard/page/questions/QuestionsList";
// import { getQuestions } from "@/modules/dashboard/services/questions.services";
import React from "react";

const QuestionsPage = async () => {
  // const questions = await getQuestions();
  // console.log("🚀 ~ QuestionsPage ~ questions:", questions);
  return <QuestionsList />;
};

export default QuestionsPage;
