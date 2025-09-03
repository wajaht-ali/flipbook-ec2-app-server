import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(
  `${config.DB_NAME}`,
  `${config.DB_USER}`,
  `${config.DB_PASSWORD}`,
  {
    host: `${config.DB_HOST}`,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Connection error:", error);
    process.exit(1);
  }
};

export { sequelize, dbConnection };
