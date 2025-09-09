import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserModel = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
      allowNull: true,
    },
    profileImg: {
      type: DataTypes.STRING,
      defaultValue:
        "https://flipbook-files-collection.s3.ap-southeast-1.amazonaws.com/images/User_dummy_profile_img.png",
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otpExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isSubscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    totalCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    remainingCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

export default UserModel;
