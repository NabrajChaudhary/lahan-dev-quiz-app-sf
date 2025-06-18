import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(5, { message: "Post Category name is required" }),
  category_slug: z
    .string()
    .min(5, { message: "Post Category slug is required" }),
  description: z.string(),
});
