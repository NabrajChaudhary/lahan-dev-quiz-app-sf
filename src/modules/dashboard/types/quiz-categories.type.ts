export type CategoryItems = {
  _id: string;
  title: string;
  description: string;
  category_slug: string;
  isActive: boolean;
};

export type CategoryResponse = {
  data: Array<CategoryItems>;
  message: string;
};
