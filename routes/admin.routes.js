import express from "express";
import { login, getMe, getStats, uploadImage } from "../controllers/admin.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { body } from "express-validator";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.get("/me", verifyAdmin, getMe);
router.get("/stats", verifyAdmin, getStats);
router.post("/upload", verifyAdmin, upload.single("image"), uploadImage);

export default router;
