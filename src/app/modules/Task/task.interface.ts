import { z } from "zod";
import { TaskValidationSchema } from "./task.validation";

export type TAddTask = z.infer<typeof TaskValidationSchema.addTask>;
export type TUpdateTask = z.infer<typeof TaskValidationSchema.updateTask>;
