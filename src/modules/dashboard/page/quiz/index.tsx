"use client";
import React from "react";
import { QuizResponse } from "../../types/quiz.type";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/modules/core/components/Table";
import { getQuizColumns } from "./quizColumn";

type Props = {
  data: QuizResponse;
};

const QuizModule = ({ data }: Props) => {
  const { data: quizData } = data;
  const columns = getQuizColumns();
  return (
    <>
      <div className="flex justify-start my-4">
        <Button>
          <Link href="/dashboard/quiz/create-quiz">Create Quiz</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={quizData} />
    </>
  );
};

export default QuizModule;
