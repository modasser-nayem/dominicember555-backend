import express from "express";
import { auth } from "../../middlewares/auth";
import requestValidate from "../../middlewares/validateRequest";
import { TaskValidationSchema } from "./task.validation";
import { TaskController } from "./task.controller";

const router = express.Router();

router.post(
  "/",
  auth(),
  requestValidate(TaskValidationSchema.addTask),
  TaskController.addTask,
);

router.get("/", auth(), TaskController.getTasks);

router.put(
  "/:id",
  auth(),
  requestValidate(TaskValidationSchema.updateTask),
  TaskController.updateTask,
);

router.patch("/:id/complete", auth(), TaskController.toggleCompleteTask);

router.delete("/:id", auth(), TaskController.deleteTask);

export const TaskRoutes = router;
