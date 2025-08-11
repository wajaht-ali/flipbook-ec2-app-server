import UserModel from "../model/userModel.js";
import FlipbookModel from "../model/flipbookModel.js";

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
    console.log(totalFiles);
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
