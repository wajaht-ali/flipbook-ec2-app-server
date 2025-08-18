import UserModel from "../model/userModel.js";
import FlipbookModel from "../model/flipbookModel.js";
import s3 from "../config/s3.js";
import config from "../config/config.js";

export const allFilesController = async (req, res) => {
  try {
    const Files = await FlipbookModel.findAll();
    if (!Files || Files.length == 0) {
      return res.status(400).send({
        success: "false",
        message: "No Files Found",
      });
    }
    return res.status(200).send({
      success: "true",
      message: "All Files",
      Files,
    });
  } catch (err) {
    return res.status(404).send({
      success: "false",
      message: "Error",
    });
  }
};

export const filesCountController = async (req, res) => {
  try {
    const Files = await FlipbookModel.findAll();
    if (!Files) {
      res.status(404).send({
        success: "false",
        message: "No Files Found",
      });
    }

    const totalFiles = Files.length;
    res.status(200).send({
      success: "true",
      message: "Total Files",
      totalFiles,
    });
  } catch (err) {
    res.status(404).send({
      success: "false",
      message: "Error",
    });
  }
};

export const userFilesController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No user found",
      });
    }

    const files = await FlipbookModel.findAll({
      where: { userId: user_id },
    });

    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No files found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Single user files fetched successfully",
      files,
    });
  } catch (err) {
    console.error("Error fetching user files:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const singleFileController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { id } = req.params;
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No user found",
      });
    }

    const file = await FlipbookModel.findOne({
      where: { id: id },
    });

    if (!file || file.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No file found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Single user file fetched successfully",
      file,
    });
  } catch (err) {
    console.error("Error fetching user files:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const fileUpdateController = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const { title, description } = req.body;

    const user = await FlipbookModel.findOne({ where: { user_id } });
    if (!user) {
      return res.status(400).send({
        success: "false",
        message: "User not found",
      });
    }
    const file = await FlipbookModel.findOne({ where: { id } });

    if (!file) {
      return res.status(400).send({
        success: "false",
        message: "File not found",
      });
    }

    const updatedFile = {};
    if (title) {
      updatedFile.title = title;
    }

    if (description) {
      updatedFile.description = description;
    }

    await file.update(updatedFile);

    return res.status(200).send({
      success: "true",
      message: "File Updated Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: "false",
      message: error,
    });
  }
};

export const fileDeleteController = async (req, res) => {
  try {
    const { user_id, id } = req.params;

    const user = await FlipbookModel.findOne({ where: { user_id } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User has no files" });
    }

    const file = await FlipbookModel.findOne({ where: { id, user_id } });
    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    const keyFromS3Url = (url) => {
      try {
        const link = new URL(url);
        let key = decodeURIComponent(link.pathname.replace(/^\/+/, ""));
        if (key.startsWith(bucket + "/")) {
          key = key.slice(bucket.length + 1);
        }
        return key;
      } catch {
        return null;
      }
    };

    const bucket = config.AWS_BUCKET_NAME;

    const key = keyFromS3Url(file.pdfUrl);

    if (!bucket) {
      return res.status(500).json({
        success: false,
        message: "AWS_BUCKET_NAME is missing/undefined",
      });
    }
    if (!key) {
      return res.status(500).json({
        success: false,
        message: "Could not derive S3 key from pdfUrl",
      });
    }

    await s3
      .deleteObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();

    await file.destroy();

    return res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
