import express from "express";
import {
  allFilesController,
  fileDeleteController,
  filesCountController,
  fileUpdateController,
  PublicFileController,
  singleFileController,
  userFilesController,
} from "../controllers/fileCoutroller.js";
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

export { router as filesRoute };
