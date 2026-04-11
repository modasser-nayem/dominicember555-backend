import { z } from "zod";

export const TaskValidationSchema = {
  addTask: z.object({
    title: z
      .string({ required_error: "title is required" })
      .nonempty("title is required"),
    description: z.string().optional(),
  }),
  updateTask: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
};
