import express from "express";
import {
  allFilesController,
  fileDeleteController,
  filesCountController,
  fileUpdateController,
  singleFileController,
  userFilesController,
} from "../controllers/fileCoutroller.js";

const router = express.Router();

router.get("/all-files", allFilesController);

router.get("/files-count", filesCountController);

router.get("/single-user-files/:user_id", userFilesController);

router.get("/single-file/:user_id/:id", singleFileController);

router.put("/file-update/:user_id/:id", fileUpdateController);

router.delete("/delete-file/:user_id/:id", fileDeleteController);

export { router as filesRoute };
