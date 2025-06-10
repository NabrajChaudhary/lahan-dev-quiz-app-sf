"use client";

// import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/modules/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/core/components/ui/dropdown-menu";
import { Badge } from "@/modules/core/components/ui/badge";
// import { publicAxios } from "@/modules/core/utils/axios";
// import { toast } from "sonner";
import { QuizTypes } from "../../types/quiz.type";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function QuizColumnsProvider() {
  const router = useRouter();

  const handleDeleteQuiz = (quizId: string) => {
    try {
      publicAxios
        .delete(`/quiz/${quizId}/delete/`)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/quiz");
        })
        .catch((data) => {
          toast.error(data.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuizStatus = (quizId: string, status: string) => {
    try {
      publicAxios
        .put(`/quiz/${quizId}/status/`, { status: status })
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/quiz");
        })
        .catch((data) => {
          toast.error(data.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuizColumns = (): ColumnDef<QuizTypes>[] => [
    {
      accessorKey: "title",
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
      cell: ({ row }) => (
        <div className="capitalize px-3">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "timeLimit",
      header: "Time Limit",
      cell: ({ row }) => <div>{row.getValue("timeLimit")}</div>,
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("difficulty")}</div>
      ),
    },
    {
      accessorKey: "numberOfQuestions",
      header: "Questions Number",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("numberOfQuestions")}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Quiz Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div>
            <Badge
              variant={status === "disabled" ? "destructive" : "default"}
              className={cn("mt-1 text-white text-md p-2 capitalize", {
                "bg-yellow-400": status === "pending",
                "bg-red-400": status === "rejected",
                "bg-green-600": status === "verified",
              })}
            >
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          // <div className="w-[300px] bg-red-300 text text-ellipsis">
          //   {row.getValue("description")}
          // </div>

          <div className="w-[250px] text-ellipsis">
            <div className="line-clamp-3 text-sm leading-relaxed text-ellipsis">
              {row.getValue("description")}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const quiz = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(quiz._id)}
              >
                Copy Quiz ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {quiz.status === "verified" && (
                <DropdownMenuItem
                  onClick={() => handleQuizStatus(quiz._id, "disabled")}
                >
                  Disable Quiz
                </DropdownMenuItem>
              )}
              {["pending", "rejected", "disabled"].includes(quiz.status) && (
                <DropdownMenuItem
                  onClick={() =>
                    publicAxios
                      .put(`/quiz/${quiz._id}/status/`, { status: "verified" })
                      .then((data) => {
                        toast.success(data.data.message);
                        router.refresh(); // Refresh the page to show updated data
                      })
                  }
                >
                  Verify and Enable Quiz
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => handleDeleteQuiz(quiz._id)}>
                Delete Quiz
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { getQuizColumns };
}

// Export the original function for backward compatibility
export const getQuizColumns = (): ColumnDef<QuizTypes>[] => {
  // Create an instance of the component to access its methods
  const { getQuizColumns: getColumns } = QuizColumnsProvider();
  return getColumns();
};
