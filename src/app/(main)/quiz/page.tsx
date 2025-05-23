import QuizContainer from "@/modules/core/components/QuizApp/QuizContainer";
import React from "react";

const QuizPage = () => {
  return (
    <div className="h-screen min-h-full flex justify-center">
      <div className="m-auto px-4 min-w-full  lg:min-w-[600px]">
        <QuizContainer />
      </div>
    </div>
  );
};

export default QuizPage;
