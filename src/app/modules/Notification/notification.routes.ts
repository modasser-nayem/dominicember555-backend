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
  auth(),
  validateRequest(notifyValidationSchema.sendNotification),
  NotificationController.sendNotification,
);

// get all notification
router.get("/", auth(), NotificationController.getAllNotifications);

// get Unread notification
router.get(
  "/unread-notify",
  auth(),
  NotificationController.getUserUnreadNotifications,
);

// get single notification
router.get("/:id", auth(), NotificationController.getSingleNotification);

export const NotificationsRoutes = router;
