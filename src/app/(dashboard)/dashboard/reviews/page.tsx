import ReviewModule from "@/modules/dashboard/page/review";
import { getAllReviews } from "@/modules/dashboard/services/reviews.services";
import React from "react";

const ReviewPage = async () => {
  const reviewData = await getAllReviews();
  return (
    <>
      <ReviewModule data={reviewData} />
    </>
  );
};

export default ReviewPage;
