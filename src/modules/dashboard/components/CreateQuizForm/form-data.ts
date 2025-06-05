import { FormFieldItem } from "@/modules/core/components/FormBuilder";

export const quizFormData: Array<FormFieldItem> = [
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
    name: "numberOfQuestions",
    type: "number",
    label: "Number of Questions",
  },
  {
    name: "timeLimit",
    type: "number",
    label: "Time Limit (Sec)",
  },
];
