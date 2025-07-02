import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

export { router as userRoute };
