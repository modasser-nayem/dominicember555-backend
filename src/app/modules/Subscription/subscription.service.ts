import prisma from "../../../db/prisma";
import logger from "../../../utils/logger";

export const SubscriptionService = {
  processWebhook: async (payload: any) => {
    try {
      const event = payload.event;
      if (!event) return;

      const { type, app_user_id, expiration_at_ms } = event;

      // Validate the user format. We expect app_user_id to be our User Object ID
      if (!app_user_id || app_user_id.length !== 24) {
        logger.warn(
          `Invalid app_user_id received from RevenueCat: ${app_user_id}`,
        );
        // Optionally handle anonymous IDs if your app allows purchasing before login.
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: app_user_id },
      });

      if (!user) {
        logger.warn(`User tracking RevenueCat not found in DB: ${app_user_id}`);
        return;
      }

      let isSubscribed = user.isSubscribed;
      let subscriptionStatus = user.subscriptionStatus;
      let subscriptionExpiryDate = user.subscriptionExpiryDate;

      if (expiration_at_ms) {
        subscriptionExpiryDate = new Date(Number(expiration_at_ms));
      }

      switch (type) {
        case "INITIAL_PURCHASE":
        case "RENEWAL":
        case "NON_RENEWING_PURCHASE":
        case "UNCANCELLATION":
          isSubscribed = true;
          subscriptionStatus = "ACTIVE";
          break;
        case "CANCELLATION":
          // CANCELLATION means they turned off auto-renew. They still have access until expiration.
          subscriptionStatus = "CANCELLED";
          break;
        case "EXPIRATION":
          // At expiration, they completely lose access.
          isSubscribed = false;
          subscriptionStatus = "EXPIRED";
          break;
        case "TRANSFER":
        case "TEST":
        case "SUBSCRIPTION_PAUSED":
          break;
        default:
          break;
      }

      // Final check: if expiration_at_ms is strictly in the past and we haven't processed an EXPIRATION, optionally revoke.
      // E.g., handling edge cases. RevenueCat's EXPIRATION is generally robust enough.
      if (subscriptionExpiryDate && subscriptionExpiryDate < new Date()) {
        isSubscribed = false;
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isSubscribed,
          subscriptionStatus,
          subscriptionExpiryDate,
        },
      });

      logger.info(
        `Successfully processed RevenueCat webhook [${type}] for user ${user.id}`,
      );
    } catch (error) {
      logger.error("Error processing RevenueCat webhook", error);
    }
  },
};
