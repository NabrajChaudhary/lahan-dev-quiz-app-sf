export type PostCategoryItems = {
  _id: string;
  title: string;
  description: string;
  category_slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostCategoryResponse = {
  data: Array<PostCategoryItems>;
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  skip: number;
  message: string;
};
