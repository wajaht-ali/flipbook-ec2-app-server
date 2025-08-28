// import fs from "fs";
// import s3 from "../config/s3.js";
// import { deleteLocalFile } from "../utils/fileHandler.js";
// import config from "../config/config.js";
// import path from "path";
// import FlipbookModel from "../model/flipbookModel.js";
// import UserModel from "../model/userModel.js";
// import docxConverter from "docx-pdf";
// import { tmpdir } from "os";

// export const uploadPdf = async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).json({ error: "No file uploaded" });

//     const filePath = file.path;
//     const fileTitle = path.parse(file.originalname).name;
//     const numberGenerator = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     const isPDF = file.mimetype === "application/pdf";
//     const isDOCX =
//       file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

//     let pdfPath;

//     if (isDOCX) {
//       pdfPath = path.join(tmpdir(), `${fileTitle}-${numberGenerator}.pdf`);

//       await new Promise((resolve, reject) => {
//         docxConverter(filePath, pdfPath, (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });
//     } else if (isPDF) {
//       pdfPath = filePath;
//     } else {
//       return res.status(400).send({
//         success: false,
//         message: "Unsupported File",
//       });
//     }

//     const fileStream = fs.createReadStream(pdfPath);
//     const params = {
//       Bucket: config.AWS_BUCKET_NAME,
//       Key: `pdfs/${fileTitle}-${numberGenerator}.pdf`,
//       Body: fileStream,
//       ContentType: "application/pdf",
//     };
//     const data = await s3.upload(params).promise();

//     await deleteLocalFile(filePath);
//     if (pdfPath !== filePath) {
//       await deleteLocalFile(pdfPath);
//     }

//     const userId = req.user.id;
//     const user = await UserModel.findByPk(userId);
//     if (!user)
//       return res
//         .status(404)
//         .send({ success: false, message: "User not found" });

//     const flipbook = await FlipbookModel.create({
//       title: fileTitle || null,
//       pdfUrl: data.Location,
//       thumbnailUrl: "",
//       userId,
//     });

//     res.status(200).json({
//       message: "Upload successful",
//       flipbook,
//       assets: data,
//       url: data.Location,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed", detail: err.message });
//   }
// };

import fs from "fs";
import s3 from "../config/s3.js";
import { deleteLocalFile } from "../utils/fileHandler.js";
import config from "../config/config.js";
import path from "path";
import FlipbookModel from "../model/flipbookModel.js";
import UserModel from "../model/userModel.js";
import docxConverter from "docx-pdf";
import { tmpdir } from "os";
import { exec } from "child_process";

export const uploadPdf = async (req, res) => {
  const convertToPDF = (filePath) => {
    const outputDir = path.dirname(filePath);

    return new Promise((resolve, reject) => {
      const command = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf "${filePath}" --outdir "${outputDir}"`;

      exec(command, (err, stdout, stderr) => {
        if (err) return reject(stderr || stdout);

        // LibreOffice changes the extension, not the base name
        const generatedPdfPath = filePath.replace(/\.\w+$/, ".pdf");

        if (!fs.existsSync(generatedPdfPath)) {
          return reject("PDF file was not generated.");
        }

        resolve(generatedPdfPath);
      });
    });
  };

  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = file.path;
    const fileTitle = path.parse(file.originalname).name;
    const numberGenerator = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const isPDF = file.mimetype === "application/pdf";
    const isDOCX =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isPPTX =
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    let pdfPath;

    if (isDOCX || isPPTX) {
      pdfPath = path.join(tmpdir(), `${fileTitle}-${numberGenerator}.pdf`);

      // await new Promise((resolve, reject) => {
      //   docxConverter(filePath, pdfPath, (err, result) => {
      //     if (err) return reject(err);
      //     resolve(result);
      //   });
      // });

      pdfPath = await convertToPDF(filePath);
    } else if (isPDF) {
      pdfPath = filePath;
    } else {
      await deleteLocalFile(filePath);
      return res.status(400).send({
        success: false,
        message: "Unsupported File",
      });
    }

    const fileStream = fs.createReadStream(pdfPath);
    const params = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: `pdfs/${fileTitle}-${numberGenerator}.pdf`,
      Body: fileStream,
      ContentType: "application/pdf",
    };
    const data = await s3.upload(params).promise();

    await deleteLocalFile(filePath);
    if (pdfPath !== filePath) {
      await deleteLocalFile(pdfPath);
    }

    const userId = req.user.id;
    const user = await UserModel.findByPk(userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    const flipbook = await FlipbookModel.create({
      title: fileTitle || null,
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
    res.status(500).json({ error: "Upload failed", detail: err.message });
  }
};
