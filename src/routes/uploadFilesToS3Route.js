import express from "express";
import { upload } from "../utils/fileHandler.js";
import { uploadPdf } from "../controllers/uploadFilesToS3Con.js";

const router = express.Router();

router.post("/", upload.single("pdf"), uploadPdf);

export { router as uploadFilesToS3Route };
