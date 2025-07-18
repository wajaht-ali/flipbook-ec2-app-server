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
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
      allowNull: false,
    },
    profileImg: {
      type: DataTypes.STRING,
      defaultValue:
        "https://flipbook-files-collection.s3.ap-southeast-1.amazonaws.com/images/User_dummy_profile_img.png",
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

export default UserModel;
