// import { DataTypes } from "sequelize";
// import UserModel from "./userModel.js";
// import { sequelize } from "../config/db.js";

// const SubscriptionModel = sequelize.define(
//   "SubscriptionModel",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
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
//     start_Date: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     end_Date: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     features: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price_Id: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     freezeTableName: true,
//     underscored: false,
//     timestamps: false,
//   }
// );

// SubscriptionModel.belongsTo(UserModel, {
//   foreignKey: "userId",
//   as: "users",
// });

// export default SubscriptionModel;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import UserModel from "./userModel.js";

const SubscriptionModel = sequelize.define(
  "SubscriptionModel", // 👈 table name
  {
    userId: {
      // 👈 use camelCase here
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, 
    timestamps: false,
  }
);

// association
SubscriptionModel.belongsTo(UserModel, {
  foreignKey: "userId", // 👈 match the field above
  as: "user",
});

export default SubscriptionModel;
