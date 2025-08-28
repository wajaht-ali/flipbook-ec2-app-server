// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db";
// import UserModel from "./userModel";

// const paymentHistory = sequelize.define(
//   "payHistory",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     plan_Name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     purchaseData: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     freezeTableName: true,
//     underscored: false,
//     timestamps: true,
//   }
// );

// paymentHistory.belongsTo(UserModel, {
//   foreignKey: "userId",
//   as: "users",
// });

// export default paymentHistory;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserModel from "./userModel.js";

const paymentHistory = sequelize.define(
  "payHistory",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseData: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: false,
    timestamps: false,
  }
);

paymentHistory.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "users",
});

export default paymentHistory;
