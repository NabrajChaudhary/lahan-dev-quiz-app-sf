"use client";
import React from "react";
import { QuestionsResponse } from "../../types/questions.type";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/modules/core/components/Table";
import { getQuestionsColumns } from "./questionColumn";
import PaginationComponent from "@/modules/core/components/Pagination";
import { useRouter } from "next/navigation";

type Props = {
  data: QuestionsResponse;
};

const QuestionsModule = ({ data }: Props) => {
  const { data: QuestionsData, currentPage, total, totalPages, limit } = data;
  const columns = getQuestionsColumns();
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <>
      <div className="flex justify-start my-4">
        <Button>
          <Link href="/dashboard/questions/add-question">Add Question</Link>
        </Button>
      </div>
      <DataTable
        initialPageSize={limit}
        columns={columns}
        data={QuestionsData}
      />
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        itemsPerPage={limit}
        totalItems={total}
        showInfo
      />
    </>
  );
};

export default QuestionsModule;
