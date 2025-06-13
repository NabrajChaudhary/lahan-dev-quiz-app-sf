"use client";
import React from "react";
import { ReviewResponse } from "../../types/review.type";
import { DataTable } from "@/modules/core/components/Table";
import { getReviewsColumns } from "./reviewColumn";

type Props = {
  data: ReviewResponse;
};

const ReviewModule = ({ data }: Props) => {
  const { data: reviewData } = data;
  console.log("🚀 ~ ReviewModule ~ reviewData:", reviewData);
  const columns = getReviewsColumns();
  return (
    <>
      <DataTable columns={columns} data={reviewData} />
    </>
  );
};

export default ReviewModule;
