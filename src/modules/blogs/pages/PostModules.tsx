"use client";
import React from "react";
import { PostsResponse } from "../types/posts.types";
import PaginationComponent from "@/modules/core/components/Pagination";
import { useRouter } from "next/navigation";

const PostModules = ({ data }: { data: PostsResponse }) => {
  console.log("🚀 ~ PostModules ~ data:", data);
  // const {
  //   currentPage,
  //   data: postData,
  //   skip,
  //   total,
  //   message,
  //   totalPages,
  // } = data;
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?page=${page}`);
  };
  return (
    <div>
      <h2>ffff</h2>
      <PaginationComponent
        currentPage={1}
        onPageChange={onPageChange}
        totalPages={20}
        itemsPerPage={15}
        totalItems={200}
      />
    </div>
  );
};

export default PostModules;
