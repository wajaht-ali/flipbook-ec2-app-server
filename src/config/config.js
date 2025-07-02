import { config as conf } from "dotenv";

conf();

const _config = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_PRIVATE_KEY: process.env.AWS_PRIVATE_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  API_TOKEN: process.env.API_TOKEN,
  MONGO_DB_URI: process.env.MONGO_DB_URI
};

const config = Object.freeze(_config);
export default config;
