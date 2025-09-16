import express from "express";
import {
  allUsersController,
  authGoogleCallBackController,
  authGoogleController,
  changePasswordController,
  deleteUserController,
  loginUserController,
  logoutController,
  passwordResetController,
  registerUserController,
  removeImgController,
  singleUserController,
   updateUserController,
  usersCountController,
  verifyOtpController,
} from "../controllers/userControllers.js";
import { uploadImg } from "../utils/fileHandler.js";
import { isAdmin, isLoggedIn } from "../Middleware/authMIddleware.js";

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

router.get("/google", authGoogleController);

router.get("/google/callback", authGoogleCallBackController);

router.get("/logout", logoutController);

router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

 
export { router as userRoute };
