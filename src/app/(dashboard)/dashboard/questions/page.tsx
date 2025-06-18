import QuestionsModule from "@/modules/dashboard/page/questions";
// import QuestionsList from "@/modules/dashboard/page/questions/QuestionsList";
import { getQuestions } from "@/modules/dashboard/services/questions.services";

import React from "react";

const QuestionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) => {
  const { page } = await searchParams;
  console.log("🚀 ~ page:", page);
  const questions = await getQuestions({ page: page });
  // console.log("🚀 ~ QuestionsPage ~ questions:", questions);
  return (
    <>
      {/* <QuestionsList /> */}
      <QuestionsModule data={questions} />
    </>
  );
};

export default QuestionsPage;
