"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/modules/core/components/ui/button";

import { QuizAttemptsItem } from "../../types/quiz-attempts.type";
import { formatDate } from "@/modules/core/utils/formatTime";

export default function QuizAttemptsColumnsProvider() {
  const getQuizAttemptsColumns = (): ColumnDef<QuizAttemptsItem>[] => [
    {
      accessorKey: "quiz",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quiz Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const quiz: { title: string } = row.getValue("quiz");
        return <div className="capitalize px-3">{quiz?.title || ""}</div>;
      },
    },

    {
      accessorKey: "quiz",
      header: "Difficulty",
      cell: ({ row }) => {
        const quiz: { difficulty: string } = row.getValue("quiz");
        return <div className="capitalize px-1">{quiz?.difficulty || ""}</div>;
      },
    },
    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => <div>{row.getValue("score")}/25</div>,
    },
    {
      accessorKey: "user",
      header: "Name",
      cell: ({ row }) => {
        const user: { firstName: string; lastName: string } =
          row.getValue("user");
        return (
          <div className="capitalize px-1">
            {`${user?.firstName} ${user.lastName}` || ""}
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Email",
      cell: ({ row }) => {
        const user: { email: string } = row.getValue("user");
        return <div className=" px-1 text-sm">{user?.email || ""}</div>;
      },
    },
    {
      accessorKey: "attemptedAt",
      header: "Attempted At",
      cell: ({ row }) => {
        const date: string = row.getValue("attemptedAt");
        return <div className="capitalize">{formatDate(date) || ""}</div>;
      },
    },
  ];

  return { getQuizAttemptsColumns };
}

// Export the original function for backward compatibility
export const getQuizAttemptsColumns = (): ColumnDef<QuizAttemptsItem>[] => {
  // Create an instance of the component to access its methods
  const { getQuizAttemptsColumns: getColumns } = QuizAttemptsColumnsProvider();
  return getColumns();
};
