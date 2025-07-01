import AWS from "aws-sdk";
import config from "./config.js";

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_PRIVATE_KEY,
  region: config.AWS_REGION,
});

export default s3;
