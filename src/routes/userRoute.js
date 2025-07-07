import express from "express";
import {
  deleteUserController,
  loginUserController,
  registerUserController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.delete("/delete", deleteUserController);

export { router as userRoute };
