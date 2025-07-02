import express from "express";
import cors from "cors";
import { replicateRoute } from "./routes/replicateRoute.js";
import { uploadFilesToS3Route } from "./routes/uploadFilesToS3Route.js";
import { userRoute } from "./routes/userRoute.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Home route is working!!!",
  });
});

app.use("/api/v1/upload", uploadFilesToS3Route);

app.use("/api/v1/replicate", replicateRoute);

app.use("/api/v1/user", userRoute);

export default app;
