import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import config from "./config/config.js";
import { replicateRoute } from "./routes/replicateRoute.js";
import { uploadFilesToS3Route } from "./routes/uploadFilesToS3Route.js";
import { userRoute } from "./routes/userRoute.js";
import { filesRoute } from "./routes/filesRoute.js";
import { subscriptionRoute } from "./routes/subscriptionRoute.js";

const app = express();

const allowedOrigins = [
  "https://flipbook-client.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    name: "connect.sid",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Home route is working!!!",
  });
});

app.use("/api/v1/upload", uploadFilesToS3Route);
app.use("/api/v1/replicate", replicateRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/files", filesRoute);
app.use("/api/v1/subscription", subscriptionRoute);

export default app;
