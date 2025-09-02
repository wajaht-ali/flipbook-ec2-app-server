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
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  AUTHOR_EMAIL: process.env.AUTHOR_EMAIL,
  AUTHOR_PASSWORD: process.env.AUTHOR_PASSWORD,

  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

const config = Object.freeze(_config);
export default config;
