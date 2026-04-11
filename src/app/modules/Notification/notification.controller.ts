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

  sendNotification: catchAsync(async (req, res) => {
    const result = await NotificationService.sendToOne(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully Send Notification",
      data: result,
    });
  }),

  getSingleNotification: catchAsync(async (req, res) => {
    const notificationId = req.params.id;
    const result = await NotificationService.getSingleNotification({
      notificationId,
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully Read Notification",
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

  getUserUnreadNotifications: catchAsync(async (req, res) => {
    const userId = req.user.id;
    const result = await NotificationService.getUserUnreadNotifications(userId);

    sendResponse(res, {
      statusCode: status.OK,
      message: "Successfully get unread notifications",
      data: result,
    });
  }),
};
