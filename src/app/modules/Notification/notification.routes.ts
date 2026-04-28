import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { notifyValidationSchema } from "./notification.validation";
import { auth } from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";

const router = express.Router();

// Add FCM token
router.post(
  "/fcm-token",
  auth(),
  validateRequest(notifyValidationSchema.addFcmToken),
  NotificationController.addFCMToken,
);

// Send Notification
router.post(
  "/send",
  validateRequest(notifyValidationSchema.sendNotification),
  NotificationController.sendNotify,
);

// get all notification
router.get("/", auth(), NotificationController.getAllNotifications);

// get Unread notification count
router.get(
  "/unread-count",
  auth(),
  NotificationController.getUnreadNotifyCount,
);

// mark all as read
router.patch("/mark-all-read", auth(), NotificationController.markAllAsRead);

export const NotificationsRoutes = router;
