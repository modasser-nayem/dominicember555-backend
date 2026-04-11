import { z } from "zod";
import { emailSchema } from "../../validation/global";

const updateUser = z.object({
  name: z.string({ required_error: "name is required" }).nonempty().optional(),
  email: emailSchema.optional(),
  location: z
    .string({ required_error: "location is required!" })
    .nonempty("location is required!")
    .optional(),
});

export const userValidationSchema = {
  updateUser,
};
