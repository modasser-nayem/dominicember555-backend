import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import prisma from "../../../db/prisma";
import { TAddTask, TUpdateTask } from "./task.interface";

export const TaskService = {
  addTask: async (payload: { data: TAddTask & { userId: string } }) => {
    const result = await prisma.task.create({
      data: payload.data,
    });
    return result;
  },

  getTasks: async (payload: { userId: string }) => {
    const result = await prisma.task.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
    });
    return result;
  },

  updateTask: async (payload: {
    id: string;
    userId: string;
    data: TUpdateTask;
  }) => {
    const existTask = await prisma.task.findUnique({
      where: { id: payload.id },
    });

    if (!existTask) {
      throw new AppError(httpStatus.NOT_FOUND, "Task not found!");
    }

    if (existTask.userId !== payload.userId) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not eligible to update this task",
      );
    }

    const result = await prisma.task.update({
      where: { id: payload.id },
      data: payload.data,
    });

    return result;
  },

  toggleCompleteTask: async (payload: { id: string; userId: string }) => {
    const existTask = await prisma.task.findUnique({
      where: { id: payload.id },
    });

    if (!existTask) {
      throw new AppError(httpStatus.NOT_FOUND, "Task not found!");
    }

    if (existTask.userId !== payload.userId) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not eligible to update this task",
      );
    }

    const result = await prisma.task.update({
      where: { id: payload.id },
      data: { isCompleted: !existTask.isCompleted },
    });

    return result;
  },

  deleteTask: async (payload: { id: string; userId: string }) => {
    const existTask = await prisma.task.findUnique({
      where: { id: payload.id },
    });

    if (!existTask) {
      throw new AppError(httpStatus.NOT_FOUND, "Task not found!");
    }

    if (existTask.userId !== payload.userId) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not eligible to delete this task",
      );
    }

    const result = await prisma.task.delete({
      where: { id: payload.id },
    });

    return result;
  },
};
