import { UserProfileType } from "@/modules/core/types/core.types";
import { QuizTypes } from "./quiz.type";

export type QuizAttemptsResponse = {
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  message: string;
  data: Array<QuizAttemptsItem>;
};

export type QuizAttemptsItem = {
  _id: string;
  user: UserProfileType & { _id: string };
  quiz: QuizTypes;
  score: string;
  attemptedAt: string;
  scoreInPercentage: string;
};
