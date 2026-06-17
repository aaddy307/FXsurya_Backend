import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

import adminRoutes from "./routes/admin.routes.js";
import videoRoutes from "./routes/video.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";

import { generalLimiter, authLimiter, contactLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

app.set("trust proxy", 1);

connectDB();

Admin.countDocuments().then(async (count) => {
  if (count === 0) {
    const admin = new Admin({
      email: process.env.ADMIN_SEED_EMAIL || "admin@fxsurya.com",
      password: process.env.ADMIN_SEED_PASSWORD || "FXSurya@2025",
      name: "FXSurya Admin",
    });
    await admin.save();
    console.log("Admin seeded:", process.env.ADMIN_SEED_EMAIL || "admin@fxsurya.com");
  }
});

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "https://f-xsurya-frontend.vercel.app",
    ],
    credentials: true,
  })
);
app.use(generalLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api/admin", authLimiter, adminRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
