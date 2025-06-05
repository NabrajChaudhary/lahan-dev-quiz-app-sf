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
import { Badge } from "@/modules/core/components/ui/badge";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { CategoryItems } from "../../types/quiz-categories.type";

export default function CategoryColumnsProvider() {
  const router = useRouter();

  const handleDeleteCategory = (categoryId: string) => {
    try {
      publicAxios
        .delete(`/categories/${categoryId}/delete/`)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/category");
        })
        .catch((data) => {
          toast.error(data.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoriesColumns = (): ColumnDef<CategoryItems>[] => [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize px-3">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "category_slug",
      header: "Category Slug",
      cell: ({ row }) => <div>{row.getValue("category_slug")}</div>,
    },

    {
      accessorKey: "isActive",
      header: "Course Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return (
          <div>
            <Badge
              variant={isActive ? "default" : "destructive"}
              className="mt-1"
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return <div>{row.getValue("description")}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

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
                onClick={() => navigator.clipboard.writeText(category._id)}
              >
                Copy category ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {category.isActive ? (
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
              )}
              <DropdownMenuItem
                onClick={() => handleDeleteCategory(category._id)}
              >
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { getCategoriesColumns };
}

// Export the original function for backward compatibility
export const getCategoriesColumns = (): ColumnDef<CategoryItems>[] => {
  // Create an instance of the component to access its methods
  const { getCategoriesColumns: getColumns } = CategoryColumnsProvider();
  return getColumns();
};
