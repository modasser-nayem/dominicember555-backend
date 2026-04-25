import z from "zod";

export const notifyValidationSchema = {
  addFcmToken: z.object({
    fcmToken: z.string({ required_error: "fcmToken is required!" }).nonempty(),
  }),
  sendNotification: z.object({
    receiverId: z
      .string({ required_error: "receiverId is required" })
      .nonempty("receiverId is required!"),
    title: z
      .string({ required_error: "title is required" })
      .nonempty("title is required!"),
    content: z
      .string({ required_error: "content is required" })
      .nonempty("content is required"),
    data: z.object({}).optional(),
  }),
};
