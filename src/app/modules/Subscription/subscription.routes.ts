import express from "express";
import { SubscriptionController } from "./subscription.controller";

const router = express.Router();

// RevenueCat Webhook Endpoint
router.post("/webhook", SubscriptionController.revenueCatWebhook);

export const SubscriptionRoutes = router;
