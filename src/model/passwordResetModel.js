import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserModel from "./userModel.js";

const PasswordResetModel = sequelize.define(
  "password_reset",
  {
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

PasswordResetModel.belongsTo(UserModel, { foreignKey: "userId" });

export default PasswordResetModel;
