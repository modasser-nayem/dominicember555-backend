import status from "http-status";
import prisma from "../../../db/prisma";
import AppError from "../../../errors/AppError";
import { fcm } from "./firebaseAdmin";
import { chunkArray } from "../../../utils/chunkArray";

export const NotificationService = {
  // Add FCM token
  addFcmToken: async (payload: { userId: string; token: string }) => {
    const isExist = await prisma.deviceToken.findUnique({
      where: { token: payload.token },
    });

    if (isExist) {
      return { message: "Token already exist" };
    }

    await prisma.deviceToken.create({
      data: {
        userId: payload.userId,
        token: payload.token,
      },
    });

    return null;
  },

  // Read All Notification
  getAllNotifications: async (userId: string) => {
    if (!userId) {
      throw new AppError(status.BAD_REQUEST, "User ID is required");
    }

    const notifications = await prisma.notification.findMany({
      where: { receiverId: userId },
      orderBy: { createdAt: "desc" },
    });

    return notifications;
  },

  // User unread notifications count
  getUnreadNotificationsCount: async (userid: string) => {
    const result = await prisma.notification.count({
      where: { receiverId: userid, isRead: false },
    });

    return {
      count: result,
    };
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string) => {
    if (!userId) {
      throw new AppError(status.BAD_REQUEST, "User ID is required");
    }

    const result = await prisma.notification.updateMany({
      where: { receiverId: userId, isRead: false },
      data: { isRead: true },
    });

    return result;
  },

  // Create & send notification to a single user
  sendToOne: async ({
    receiverId,
    title,
    content,
    data,
  }: {
    receiverId: string;
    title: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  }) => {
    // Always create DB notification
    const notification = await prisma.notification.create({
      data: {
        receiverId,
        title,
        content,
        data,
      },
    });

    // Get all device tokens
    const getDeviceTokens = await prisma.deviceToken.findMany({
      where: { userId: receiverId },
      select: { token: true },
    });

    const tokens = getDeviceTokens.map((t) => t.token);

    if (!tokens.length) return;

    // Send push only if FCM token exists
    await sendFcm(tokens, {
      title,
      content,
      data: {
        ...data,
        notificationId: notification.id,
      },
    });

    return notification;
  },

  // Send to multiple users
  sendToMany: async ({
    receiverIds,
    title,
    content,
    data,
  }: {
    receiverIds: string[];
    title: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
  }) => {
    // Create notifications in DB
    await prisma.notification.createMany({
      data: receiverIds.map((id) => ({
        receiverId: id,
        title,
        content,
        data,
      })),
    });

    // Collect valid tokens
    const getDeviceTokens = await prisma.deviceToken.findMany({
      where: { userId: { in: receiverIds } },
      select: { token: true },
    });

    const tokens = getDeviceTokens.map((t) => t.token);

    if (!tokens.length) return;

    // Send in batches
    const batches = chunkArray(tokens, 500);
    for (const batch of batches) {
      await sendFcm(batch, {
        title,
        content: content,
        data: {
          ...data,
        },
      });
    }
  },
};

// send push via FCM
const sendFcm = async (
  tokens: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { title: string; content: string; data: any },
) => {
  if (tokens.length === 0) return;

  try {
    const response = await fcm.sendEachForMulticast({
      tokens,
      notification: { title: payload.title, body: payload.content },
      data: payload.data || {},
    });

    // Remove invalid tokens
    response.responses.forEach(async (r, i) => {
      if (
        !r.success &&
        r.error?.code === "messaging/registration-token-not-registered"
      ) {
        await prisma.deviceToken.deleteMany({
          where: { token: tokens[i] },
        });
      }
    });
  } catch (err) {
    console.error("FCM Send Error:", err);
  }
};
