"use client";

import React from "react";
// import { CategoryResponse } from "../../types/quiz-categories.type";
// import { DataTable } from "@/modules/core/components/Table";
// import { getCategoriesColumns } from "./categoriesColumn";
import { Button } from "@/modules/core/components/ui/button";
import Link from "next/link";

// type Props = {
//   data: CategoryResponse;
// };

const PostsModule = () => {
  // const { data: categoryData } = data;
  //   const columns = getCategoriesColumns();
  return (
    <>
      <div className="flex justify-start my-4">
        <Button>
          <Link href="/dashboard/posts/create">Add Posts</Link>
        </Button>
      </div>
      {/* <DataTable columns={[]} data={categoryData} /> */}
    </>
  );
};

export default PostsModule;
