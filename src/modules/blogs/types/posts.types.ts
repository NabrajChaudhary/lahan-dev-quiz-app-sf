import { CategoryItems } from "@/modules/dashboard/types/quiz-categories.type";

export type PostsResponse = {
  data: Array<PostItems>;
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  message: string;
};

export type PostItems = {
  updatedAt: string;
  createdAt: string;
  publish: boolean;
  tags: Array<string> | null;
  image: string | null;
  category: CategoryItems;
  extract: string | null;
  content: string;
  title: string;
  _id: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
    profilePhoto: string | null;
  };
};
