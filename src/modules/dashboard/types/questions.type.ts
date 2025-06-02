import { CategoryItems } from "./quiz-categories.type";

export type QuestionsItems = {
  _id: string;
  explanation: string;
  category: CategoryItems;
  question: string;
  options: Array<string>;
  difficulty: "easy" | "medium" | "hard";
  correctAnswer: string;
};

export type QuestionsResponse = {
  data: Array<QuestionsItems>;
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  message: string;
};
