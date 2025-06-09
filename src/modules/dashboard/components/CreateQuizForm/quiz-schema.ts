import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, { message: "Quiz title is required" }),
  quizBy: z.string().min(5, { message: "User is required" }),
  description: z.string(),
  category: z.string(),
  questionSlug: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"], {
    message: "Difficulty is required",
  }),
  timeLimit: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .pipe(
      z
        .number({
          required_error: "required field",
          invalid_type_error: "Number must be greater than 100",
        })
        .min(100)
        .max(1500)
    ),
  numberOfQuestions: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .pipe(
      z
        .number({
          required_error: "required field",
          invalid_type_error: "Number must be greater than 100",
        })
        .min(50)
        .max(1000)
    ),
});
