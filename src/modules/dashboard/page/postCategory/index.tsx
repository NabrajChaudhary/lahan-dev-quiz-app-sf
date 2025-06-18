"use client";
import { DataTable } from "@/modules/core/components/Table";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";
import React from "react";
import { getPostCategoriesColumns } from "./postCategories.column";
import { PostCategoryResponse } from "../../types/post-categories.type";
type Props = {
  data: PostCategoryResponse;
};
const PostCategoryModule = ({ data }: Props) => {
  const { data: postCategoryData } = data;
  const columns = getPostCategoriesColumns();
  return (
    <>
      <div className="flex justify-start my-4">
        <Button>
          <Link href="/dashboard/post-category/add-category">Add Category</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={postCategoryData || []} />
    </>
  );
};

export default PostCategoryModule;
