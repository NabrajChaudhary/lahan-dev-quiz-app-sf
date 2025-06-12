import { FormFieldItem } from "@/modules/core/components/FormBuilder";

export const feedbackFormData: Array<FormFieldItem> = [
  {
    name: "description",
    type: "textarea",
    label: "Feedback Description",
    placeholder:
      "We'd love to hear your thoughts! Share your feedback on the quiz app—what you liked, what could be better, and how we can improve your experience.",
  },
  {
    name: "rating",
    type: "rating",
    label: "Rate your experience",
  },
];
