import { FormFieldItem } from "@/modules/core/components/FormBuilder";

export const postCategoryFormData: Array<FormFieldItem> = [
  {
    name: "title",
    type: "text",
    label: "Category Name",
  },
  {
    name: "category_slug",
    type: "text",
    label: "Category Slug",
  },
  {
    name: "description",
    type: "textarea",
    label: "Category Description",
  },
];
