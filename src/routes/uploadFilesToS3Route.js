import express from "express";
import { upload } from "../utils/fileHandler.js";
import { isLoggedIn } from "../Middleware/authMIddleware.js";
import { uploadPdf } from "../controllers/uploadFilesToS3Con.js";

const router = express.Router();

router.post("/", isLoggedIn, upload.single("file"), uploadPdf);

export { router as uploadFilesToS3Route };
