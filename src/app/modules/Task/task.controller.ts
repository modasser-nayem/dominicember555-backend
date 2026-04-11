import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TaskService } from "./task.service";

export const TaskController = {
  addTask: catchAsync(async (req, res) => {
    const userId = req.user.id;

    const result = await TaskService.addTask({
      data: { ...req.body, userId },
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Task Successfully Created",
      data: result,
    });
  }),

  getTasks: catchAsync(async (req, res) => {
    const userId = req.user.id;

    const result = await TaskService.getTasks({ userId });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully Retrieved Tasks",
      data: result,
    });
  }),

  updateTask: catchAsync(async (req, res) => {
    const userId = req.user.id;

    const result = await TaskService.updateTask({
      userId,
      id: req.params.id,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task Successfully Updated",
      data: result,
    });
  }),

  toggleCompleteTask: catchAsync(async (req, res) => {
    const userId = req.user.id;

    const result = await TaskService.toggleCompleteTask({
      userId,
      id: req.params.id,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task Completion Status Toggled",
      data: result,
    });
  }),

  deleteTask: catchAsync(async (req, res) => {
    const userId = req.user.id;

    const result = await TaskService.deleteTask({
      userId,
      id: req.params.id,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task Successfully Deleted",
      data: result,
    });
  }),
};
