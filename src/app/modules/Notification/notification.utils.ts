import { NotificationService } from "./notification.service";

interface TNotifyUser {
  receiverId: string;
  title: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export async function notifyUser({
  receiverId,
  content,
  data,
  title,
}: TNotifyUser) {
  await NotificationService.sendToOne({
    receiverId,
    title,
    content,
    data,
  });

  // // 1. Try realtime WebSocket
  // const pushed = wsSendToUser(receiverId, {
  //   payload: {
  //     content,
  //     ...data,
  //   },
  // });

  // // 2. If realtime fails → send FCM Push
  // if (!pushed) {
  //   await NotificationService.sendToOne({
  //     receiverId,
  //     content,
  //     data,
  //   });
  // }

  return true;
}
