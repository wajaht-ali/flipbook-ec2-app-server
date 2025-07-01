import { config as conf } from "dotenv";

conf();

const _config = {
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_PRIVATE_KEY: process.env.AWS_PRIVATE_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  PORT: process.env.PORT,
  API_TOKEN: process.env.API_TOKEN,
};

const config = Object.freeze(_config);
export default config;
