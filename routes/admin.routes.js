import express from "express";
import { login, getMe, getStats } from "../controllers/admin.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { body } from "express-validator";

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

export default router;
