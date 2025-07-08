import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import UserModel from "../model/userModel.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        msg: "All fields are required!",
      });
    }

    const user = await UserModel.findOne({ email: email });
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
  } catch (error) {
    console.error("Error in user sign up:", error);
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

    const user = await UserModel.findOne({ email });
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
    console.error("Error in user login:", error);
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
        message: "id not found or required",
      });
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
