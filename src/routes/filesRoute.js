import express from "express";
import {
  allFilesController,
  filesCountController,
  singleFileController,
  userFilesController,
} from "../controllers/fileCoutroller.js";

const router = express.Router();

router.get("/all-files", allFilesController);

router.get("/files-count", filesCountController);

router.get("/single-user-files/:user_id", userFilesController);

router.get("/single-file/:user_id/:id", singleFileController);

export { router as filesRoute };
