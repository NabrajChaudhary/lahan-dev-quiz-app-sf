"use client";

import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/modules/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/modules/core/components/ui/dropdown-menu";
import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { ReviewItems } from "../../types/review.type";
import { Rating } from "@/modules/core/components/Rating";

export default function ReviewColumnsProvider() {
  const router = useRouter();

  const handleDeleteReview = (reviewId: string) => {
    try {
      publicAxios
        .delete(`/feedback/${reviewId}/delete/`)
        .then((data) => {
          toast.success(data.data.message);
          router.push("/dashboard/reviews");
        })
        .catch((data) => {
          toast.error(data.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getReviewsColumns = (): ColumnDef<ReviewItems>[] => [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user: { firstName: string; lastName: string } =
          row.getValue("user");
        return (
          <div className=" text-ellipsis">
            <div className="line-clamp-3 text-sm leading-relaxed text-ellipsis">
              {user.firstName} {user.lastName}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Email",
      cell: ({ row }) => {
        const user: { email: string } = row.getValue("user");
        return (
          <div className=" text-ellipsis">
            <div className="line-clamp-3 text-sm leading-relaxed text-ellipsis">
              {user.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <div className="w-[250px] text-ellipsis">
            <div className="line-clamp-3 text-sm leading-relaxed text-ellipsis">
              {row.getValue("description")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        return (
          <div className="text-ellipsis">
            <div className="line-clamp-3 text-sm leading-relaxed text-ellipsis">
              <Rating value={row.getValue("rating")} readOnly />
            </div>
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const review = row.original;

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

              <DropdownMenuItem onClick={() => handleDeleteReview(review._id)}>
                Delete Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { getReviewsColumns };
}

// Export the original function for backward compatibility
export const getReviewsColumns = (): ColumnDef<ReviewItems>[] => {
  // Create an instance of the component to access its methods
  const { getReviewsColumns: getColumns } = ReviewColumnsProvider();
  return getColumns();
};
