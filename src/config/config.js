import { config as conf } from "dotenv";

conf();

const _config = {
  PORT: process.env.PORT,
  //   MONGO_DB_URI: process.env.MONGO_DB_URI,
  //   JWT_SECRET: process.env.JWT_SECRET,
  API_TOKEN: process.env.API_TOKEN,
};

const config = Object.freeze(_config);
export default config;
