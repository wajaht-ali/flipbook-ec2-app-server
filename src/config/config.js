import { config as conf } from "dotenv";

conf();

const _config = {
  PORT: process.env.PORT,
  API_TOKEN: process.env.API_TOKEN,
};

const config = Object.freeze(_config);
export default config;
