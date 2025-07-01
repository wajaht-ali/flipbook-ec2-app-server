import express from "express";
import cors from "cors";
import { replicateRoute } from "./routes/replicateRoute.js";
import { uploadFilesToS3Route } from "./routes/uploadFilesToS3Route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Home route is working!!!",
  });
});

app.use("/api/v1/upload", uploadFilesToS3Route);

app.use("/api/v1/replicate", replicateRoute);

export default app;
