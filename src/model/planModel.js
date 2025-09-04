// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db.js";

// const planModel = sequelize.define(
//   "Plans",
//   {
//     plan_name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     priceId: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: "priceid",
//       primaryKey: true, 
//     },
//     duration: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     features: {
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

// export default planModel;











import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 

const planModel = sequelize.define(
  "Plans",
  {
    plan_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "priceid",
      primaryKey: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    underscored: false,
    timestamps: false,
  }
);





export default planModel;