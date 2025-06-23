import express from "express";
import cors from "cors";
import { replicateRoute } from "./routes/replicateRoute.js";
import config from "./config/config.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Home route is working!!!",
  });
});

app.use("/api/v1/replicate", replicateRoute);
export default app;
