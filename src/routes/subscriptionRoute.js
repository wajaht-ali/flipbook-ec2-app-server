import {
  getPlans,
  subscriptionController,
  verifyPayment,
} from "../controllers/subscriptionController.js";
import express from "express";

const router = express.Router();

router.post("/payment", subscriptionController);

router.get("/getPlans", getPlans);

router.post("/verify-payment", verifyPayment);

export { router as subscriptionRoute };
