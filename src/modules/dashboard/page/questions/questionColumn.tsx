"use client";

import { useRouter } from "next/navigation";
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
// import { Badge } from "@/modules/core/components/ui/badge";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { QuestionsItems } from "../../types/questions.type";

export default function QuestionColumnsProvider() {
  const router = useRouter();

  const handleDeleteQuestion = (questionId: string) => {
    try {
      publicAxios
        .delete(`/questions/${questionId}/delete/`)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/questions");
        })
        .catch((data) => {
          toast.error(data.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionsColumns = (): ColumnDef<QuestionsItems>[] => [
    {
      accessorKey: "question",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Question
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize px-3 w-[300px] max-h-20 line-clamp-3 overflow-ellipsis">
          {row.getValue("question")}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category: { title: string } = row.getValue("category");
        return <div>{category?.title || ""}</div>;
      },
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => {
        return <div className=" capitalize">{row.getValue("difficulty")}</div>;
      },
    },
    {
      accessorKey: "correctAnswer",
      header: "Correct Answer",
      cell: ({ row }) => {
        return <div>{row.getValue("correctAnswer")}</div>;
      },
    },

    {
      accessorKey: "options",
      header: "Options",
      cell: ({ row }) => {
        const options: [string] = row.getValue("options") || [];
        return (
          <div>
            {options.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const question = row.original;

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
                onClick={() => navigator.clipboard.writeText(question._id)}
              >
                Copy Question ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* {category.isActive ? (
                <DropdownMenuItem
                  onClick={() =>
                    publicAxios
                      .put(`/categories/${category._id}/deactivate`)
                      .then((data) => {
                        toast.success(data.data.message);
                        router.refresh(); // Refresh the page to show updated data
                      })
                  }
                >
                  Deactive Category
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    publicAxios
                      .put(`/categories/${category._id}/activate`)
                      .then((data) => {
                        toast.success(data.data.message);
                        router.refresh(); // Refresh the page to show updated data
                      })
                  }
                >
                  Activate Category
                </DropdownMenuItem>
              )} */}
              <DropdownMenuItem
                onClick={() => handleDeleteQuestion(question._id)}
              >
                Delete Question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { getQuestionsColumns };
}

// Export the original function for backward compatibility
export const getQuestionsColumns = (): ColumnDef<QuestionsItems>[] => {
  // Create an instance of the component to access its methods
  const { getQuestionsColumns: getColumns } = QuestionColumnsProvider();
  return getColumns();
};
