"use client";
import React from "react";
import { QuestionsResponse } from "../../types/questions.type";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/modules/core/components/Table";
import { getQuestionsColumns } from "./questionColumn";

type Props = {
  data: QuestionsResponse;
};

const QuestionsModule = ({ data }: Props) => {
  const { data: QuestionsData } = data;
  const columns = getQuestionsColumns();
  return (
    <>
      <div className="flex justify-start my-4">
        <Button>
          <Link href="/dashboard/questions/add-question">Add Question</Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={QuestionsData}
        filterColumn="course_name"
        filterPlaceholder="Search by Course Name"
      />
    </>
  );
};

export default QuestionsModule;
