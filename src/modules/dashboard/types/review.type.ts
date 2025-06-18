import { UserProfileType } from "@/modules/core/types/core.types";

export type ReviewResponse = {
  data: Array<ReviewItems>;
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  limit: number;
  message: string;
};

export type ReviewItems = {
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  user: UserProfileType;
};
