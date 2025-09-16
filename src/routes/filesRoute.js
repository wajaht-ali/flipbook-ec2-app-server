import express from "express";
import {
  allFilesController,
  fileDeleteController,
  filesCountController,
  fileUpdateController,
  ProtectedFileController,
  PublicFileController,
  singleFileController,
  userFilesController,
} from "../controllers/fileController.js";
import { isLoggedIn } from "../Middleware/authMIddleware.js";

const router = express.Router();

router.get("/all-files", allFilesController);

router.get("/files-count", filesCountController);

router.get("/single-user-files/:user_id", userFilesController);

router.get("/single-file/:id", isLoggedIn, singleFileController);

router.put("/file-update/:user_id/:id", fileUpdateController);

router.delete("/delete-file/:user_id/:id", fileDeleteController);

// public route for status public files 
router.post("/public/flipbook", PublicFileController)

// Protected route - login required
router.post("/protected/flipbook", isLoggedIn, ProtectedFileController);

export { router as filesRoute };
