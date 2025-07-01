import fs from "fs";
import s3 from "../config/s3.js";
import { deleteLocalFile } from "../utils/fileHandler.js";
import config from "../config/config.js";
import path from "path";

export const uploadPdf = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileContent = fs.readFileSync(file.path);

    const params = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: `pdfs/${Date.now()}-${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();
    deleteLocalFile(file.filename);

    res.status(200).json({ assets: data, url: data.Location });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};
