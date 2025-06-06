import { QuestionsItems } from "./questions.type";

export type QuizTypes = {
  _id: string;
  title: string;
  description: string;
  status: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  numberOfQuestions: number;
  questions: Array<QuestionsItems | string>;
  quizBy:
    | string
    | {
        _id: string;
        email: string;
        role: string;
      };
  quizByRole: string;
};

export type SingleQuizResponse = {
  data: QuizTypes;
  message: string;
};

export type QuizResponse = {
  data: Array<QuizTypes>;
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  message: string;
};
