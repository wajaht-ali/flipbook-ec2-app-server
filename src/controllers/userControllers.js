import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import UserModel from "../model/userModel.js";
import fs from "fs";
import s3 from "../config/s3.js";
import { deleteLocalFile } from "../utils/fileHandler.js";
import sendMail from "../utils/sendEmail.js";
import { generateEmailTemplate } from "../utils/emailTemplete.js";
import PasswordResetModel from "../model/passwordResetModel.js";
import { generateOTPTemplate } from "../utils/passwordResetTemplete.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        msg: "All fields are required!",
      });
    }

    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({
        success: false,
        msg: "User already exists with this email!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      msg: "Sign up successfully!",
      user: newUser,
    });

    let html_Email = generateEmailTemplate(name);

    if (newUser) {
      sendMail(email, `Welcome ${name} to our product`, html_Email);
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      msg: `Error with user sign up ${error}`,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required!",
      });
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Password is incorrect!",
      });
    }

    const token = jwt.sign({ sub: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: config.JWT_EXPIRY,
      algorithm: "HS256",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `${error.message}`,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id not found",
      });
    }

    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;
    const { name, password, role } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Id required",
      });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }
    const updatedData = {};
    if (name) {
      updatedData.name = name;
    }
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    if (role) {
      updatedData.role = role;
    }

    if (file) {
      const fileStream = fs.createReadStream(file.path);

      const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: `images/${file.originalname}-${Date.now()}`,
        Body: fileStream,
        ContentType: file.mimetype,
      };

      const data = await s3.upload(params).promise();
      if (data) {
        updatedData.profileImg = data.Location;
      }
      deleteLocalFile(file.path);
    }

    await user.update(updatedData);

    if (!updatedData) {
      return res.status(400).send({
        success: false,
        message: "Error in updating",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Data successfully updated",
      data: updatedData,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const removeImgController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await user.update({
      profileImg:
        "https://flipbook-files-collection.s3.ap-southeast-1.amazonaws.com/images/User_dummy_profile_img.png",
    });

    return res.status(200).send({
      success: true,
      message: "Profile image removed successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const allUsersController = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    });

    const TotalUsers = users.length;

    return res.status(200).send({
      success: true,
      message: "All Users Fetched",
      users,
      TotalUsers,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const usersCountController = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    const TotalUsers = users.length;

    return res.status(200).send({
      success: true,
      message: "Total Users",
      TotalUsers,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export const singleUserController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Id is required",
      });
    }

    const user = await UserModel.findOne(
      { where: { id } },
      {
        attributes: { exclude: ["password"] },
      }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No User Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Found",
      user,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: err.message,
    });
  }
};

export const passwordResetRequestController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PasswordResetModel.create({
      userId: user.id,
      otp,
      expiresAt,
    });

    let html_OTP = generateOTPTemplate(user.name,otp);

    await sendMail(email, `Flipbook Reset Password Request`, html_OTP);
    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
