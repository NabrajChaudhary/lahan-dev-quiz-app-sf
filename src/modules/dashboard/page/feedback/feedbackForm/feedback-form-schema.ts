import { z } from "zod";

export const formSchema = z.object({
  rating: z.number().min(1, "Please provide a rating").max(5),
  description: z.string(),
});
