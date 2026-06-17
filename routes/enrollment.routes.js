import express from "express";
import { createEnrollment, getEnrollments, getEnrollmentById, updateEnrollment } from "../controllers/enrollment.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { generalLimiter } from "../middleware/rateLimit.middleware.js";
import { createEnrollmentValidator } from "../validators/enrollment.validator.js";

const router = express.Router();

router.post("/", generalLimiter, createEnrollmentValidator, validate, createEnrollment);
router.get("/", verifyAdmin, getEnrollments);
router.get("/:id", verifyAdmin, getEnrollmentById);
router.patch("/:id", verifyAdmin, updateEnrollment);

export default router;
