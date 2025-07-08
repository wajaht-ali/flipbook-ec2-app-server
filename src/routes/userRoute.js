import express from "express";
import {
  deleteUserController,
  loginUserController,
  registerUserController,
  updateUserController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.delete("/delete/:id", deleteUserController);

router.put("/update-user/:id", updateUserController);

export { router as userRoute };
