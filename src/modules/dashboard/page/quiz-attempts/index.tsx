"use client";
import React from "react";

import { DataTable } from "@/modules/core/components/Table";
import { QuizAttemptsResponse } from "../../types/quiz-attempts.type";
import { getQuizAttemptsColumns } from "./quizAttemptsColumn";

type Props = {
  data: QuizAttemptsResponse;
};

const QuizAttemptModule = ({ data }: Props) => {
  const { data: quizData } = data;
  const columns = getQuizAttemptsColumns();
  return (
    <>
      <DataTable
        columns={columns}
        data={quizData}
        filterColumn="course_name"
        filterPlaceholder="Search by Course Name"
      />
    </>
  );
};

export default QuizAttemptModule;
