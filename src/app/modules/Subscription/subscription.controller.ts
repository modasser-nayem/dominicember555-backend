import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { SubscriptionService } from "./subscription.service";
import config from "../../../config";

export const SubscriptionController = {
  revenueCatWebhook: catchAsync(async (req, res) => {
    const payload = req.body;

    // RevenueCat webhook authorization check
    // You should configure a custom authorization header in your RevenueCat webhook settings
    // and match it with REVENUECAT_WEBHOOK_AUTH in your .env
    const rcAuth = req.headers.authorization;
    const expectedAuth = config.revenuecat.REVENUECAT_WEBHOOK_AUTH;

    if (expectedAuth && rcAuth !== expectedAuth) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized webhook request" });
    }

    // Process the webhook asynchronously to not block the response
    await SubscriptionService.processWebhook(payload);

    // RevenueCat expects a 200 OK response
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Webhook received and processed" });
  }),
};
