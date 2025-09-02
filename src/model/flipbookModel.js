import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserModel from "./userModel.js";

const FlipbookModel = sequelize.define(
  "flipbooks",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "private",
    },
    publicUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

UserModel.hasMany(FlipbookModel, {
  foreignKey: "userId",
  as: "flipbooks",
});

FlipbookModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "users",
});

export default FlipbookModel;
