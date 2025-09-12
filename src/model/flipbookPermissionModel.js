import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import FlipbookModel from "./flipbookModel.js";

const FlipbookPermissionModel = sequelize.define(
  "flipbook_permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flipbookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "flipbooks",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// associations
FlipbookModel.hasMany(FlipbookPermissionModel, {
  foreignKey: "flipbookId",
  as: "permissions",
});

FlipbookPermissionModel.belongsTo(FlipbookModel, {
  foreignKey: "flipbookId",
  as: "flipbook",
});

export default FlipbookPermissionModel;
