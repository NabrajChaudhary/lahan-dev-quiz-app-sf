import { FormFieldItem } from "@/modules/core/components/FormBuilder";

export const quizFormData = (
  categoryOptions: Array<{ id: string; label: string }>
): Array<FormFieldItem> => {
  return [
    {
      name: "title",
      type: "text",
      label: "Quiz Title",
    },
    {
      name: "description",
      type: "textarea",
      label: "Quiz Description",
    },
    {
      name: "difficulty",
      type: "select",
      label: "Select Difficulty",
      options: [
        { id: "easy", label: "Easy" },
        { id: "medium", label: "Medium" },
        { id: "hard", label: "Hard" },
      ],
    },
    {
      name: "category",
      type: "select",
      label: "Select Category",
      options: categoryOptions || [],
    },
    {
      name: "numberOfQuestions",
      type: "number",
      label: "Number of Questions",
    },
    {
      name: "timeLimit",
      type: "number",
      label: "Time Limit (Sec)",
    },
    {
      name: "questionSlug",
      type: "text",
      label: "Question Slugs",
    },
  ];
};
