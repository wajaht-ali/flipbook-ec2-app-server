import express from "express";
import { multiViewController } from "../controllers/replicateController.js";

const router = express.Router();

router.post("/generation", multiViewController);

export { router as replicateRoute };
