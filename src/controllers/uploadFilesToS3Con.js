import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { exec } from "child_process";
import s3 from "../config/s3.js";
import config from "../config/config.js";
import FlipbookModel from "../model/flipbookModel.js";
import UserModel from "../model/userModel.js";

// --- small, local helper: safe, idempotent delete ---
async function safeDelete(p) {
  if (!p) return;
  try {
    await fsp.unlink(p);
  } catch (err) {
    // Ignore "not found"; log everything else (but don't throw)
    if (err && err.code !== "ENOENT") {
      console.warn(`[uploadPdf] Failed to delete ${p}:`, err);
    }
  }
}

// --- convert using LibreOffice (Windows path escaped) ---
function convertToPDF(inputPath) {
  const outputDir = path.dirname(inputPath);
  return new Promise((resolve, reject) => {
    const soffice = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;
    const command = `${soffice} --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

    exec(command, (err, stdout, stderr) => {
      if (err) return reject(stderr || stdout || err);
      const generatedPdfPath = inputPath.replace(/\.\w+$/, ".pdf");
      fs.existsSync(generatedPdfPath)
        ? resolve(generatedPdfPath)
        : reject(new Error("PDF file was not generated."));
    });
  });
}

export const uploadPdf = async (req, res) => {
  // Track paths so we can always clean them up in finally
  const uploadedPath = req.file?.path || null;
  let generatedPdfPath = null;

  // Common cleanup that always runs
  const cleanup = async () => {
    // Delete the original upload
    await safeDelete(uploadedPath);
    // If we created a new PDF (docx/pptx case), delete that too
    if (generatedPdfPath && generatedPdfPath !== uploadedPath) {
      await safeDelete(generatedPdfPath);
    }
  };

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileTitle = path.parse(file.originalname).name;
    const numberGenerator = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const isPDF = file.mimetype === "application/pdf";
    const isDOCX =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isPPTX =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    // Validate file type early; make sure to clean the uploaded file
    if (!isPDF && !isDOCX && !isPPTX) {
      // No await cleanup here—finally will run after we return;
      // but since we’re returning, do an immediate delete for the uploadedPath.
      await safeDelete(uploadedPath);
      return res
        .status(400)
        .json({ success: false, message: "Unsupported File" });
    }

    // Prepare PDF path
    if (isDOCX || isPPTX) {
      // (We’ll compute a name but LibreOffice decides final path; we’ll read it from convertToPDF)
      generatedPdfPath = await convertToPDF(uploadedPath);
    } else {
      // PDF uploaded as-is
      generatedPdfPath = uploadedPath;
    }

    // Upload to S3
    const fileStream = fs.createReadStream(generatedPdfPath);
    const params = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: `pdfs/${fileTitle}-${numberGenerator}.pdf`,
      Body: fileStream,
      ContentType: "application/pdf",
    };
    const data = await s3.upload(params).promise();

    // Create DB row
    const userId = req.user.id;
    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const flipbook = await FlipbookModel.create({
      title: fileTitle || null,
      pdfUrl: data.Location,
      thumbnailUrl: "",
      userId,
    });

    // Success response; files will be deleted in finally
    return res.status(200).json({
      message: "Upload successful",
      flipbook,
      assets: data,
      url: data.Location,
    });
  } catch (err) {
    // Ensure we always send a readable error
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "Upload failed";
    return res.status(500).json({ error: "Upload failed", detail: message });
  } finally {
    
    await cleanup();
  }
};
