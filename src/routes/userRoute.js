import express from "express";
import {
  deleteUserController,
  loginUserController,
  registerUserController,
  updateUserController,
} from "../controllers/userControllers.js";
import { uploadImg } from "../utils/fileHandler.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.delete("/delete/:id", deleteUserController);

router.put("/update-user/:id", uploadImg.single("img"), updateUserController);

export { router as userRoute };
