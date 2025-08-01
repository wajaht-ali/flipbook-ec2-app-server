import express from "express";
import {
  allUsersController,
  changePasswordController,
  deleteUserController,
  loginUserController,
  passwordResetController,
  registerUserController,
  removeImgController,
  singleUserController,
  updateUserController,
  usersCountController,
  verifyOtpController,
} from "../controllers/userControllers.js";
import { uploadImg } from "../utils/fileHandler.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.delete("/delete/:id", deleteUserController);

router.put("/update-user/:id", uploadImg.single("img"), updateUserController);

router.put("/remove-profile-img/:id", removeImgController);

router.get("/all-users", allUsersController);

router.get("/total-users", usersCountController);

router.get("/get-user/:id", singleUserController);

router.post("/password-reset", passwordResetController);

router.post("/verify-otp", verifyOtpController);

router.put("/change-password", changePasswordController);

export { router as userRoute };
