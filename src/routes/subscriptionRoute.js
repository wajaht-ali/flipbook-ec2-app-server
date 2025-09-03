import {
  getPlans,
  getsubcriptionDetails,
  getUserSubscriptionDetails,
  subscriptionController,
  verifyPayment,
} from "../controllers/subscriptionController.js";
import express from "express";

const router = express.Router();

router.post("/payment", subscriptionController);

router.get("/getPlans", getPlans);

router.post("/verify-payment", verifyPayment);


router.get("/get-subscription-details", getsubcriptionDetails);

router.post("/get-user-subscription-details", getUserSubscriptionDetails);

export { router as subscriptionRoute };
