import fs from "fs";
import s3 from "../config/s3.js";
import { deleteLocalFile } from "../utils/fileHandler.js";
import config from "../config/config.js";
import path from "path";
import FlipbookModel from "../model/flipbookModel.js";
import UserModel from "../model/userModel.js";

export const uploadPdf = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileStream = fs.createReadStream(file.path);

    const params = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: `pdfs/${file.originalname}-${Date.now()}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();
    deleteLocalFile(file.path);

    const userId = req.user.id;

    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let fileTitle = path.parse(file.originalname).name;

    const flipbook = await FlipbookModel.create({
      title: fileTitle ? fileTitle : null,
      pdfUrl: data.Location,
      thumbnailUrl: "",
      userId,
    });

    res.status(200).json({
      message: "Upload successful",
      flipbook,
      assets: data,
      url: data.Location,
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed", detail: err.message });
  }
};

