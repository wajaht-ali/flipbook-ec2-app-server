import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("💹 Database connected!");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error with connecting database! ", err);
    });

    await mongoose.connect(config.MONGO_DB_URI);
  } catch (error) {
    console.log("Failed to connect to database: ", error);
    process.exit();
  }
};

export default connectDB;
