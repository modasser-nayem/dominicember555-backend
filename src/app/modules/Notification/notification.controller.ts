import status from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NotificationService } from "./notification.service";

export const NotificationController = {
  addFCMToken: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await NotificationService.addFcmToken({
      userId,
      token: req.body.fcmToken,
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully Add FCM Token",
      data: result,
    });
  }),

  sendNotify: catchAsync(async (req, res) => {
    const result = await NotificationService.sendToOne(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully Send Notification",
      data: result,
    });
  }),

  getAllNotifications: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await NotificationService.getAllNotifications(userId);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully Read Notifications",
      data: result,
    });
  }),

  getUnreadNotifyCount: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result =
      await NotificationService.getUnreadNotificationsCount(userId);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully get unread notifications count",
      data: result,
    });
  }),

  markAllAsRead: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await NotificationService.markAllAsRead(userId);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully marked as read",
      data: result,
    });
  }),
};
