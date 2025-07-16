import express from "express";
import {
  allUsersController,
  deleteUserController,
  loginUserController,
  registerUserController,
  removeImgController,
  singleUserController,
  updateUserController,
  usersCountController,
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

export { router as userRoute };
