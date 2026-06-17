import express from "express";
import { getVideos, getVideoById, createVideo, updateVideo, deleteVideo } from "../controllers/video.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createVideoValidator, updateVideoValidator } from "../validators/video.validator.js";
import { generalLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.get("/", generalLimiter, getVideos);
router.get("/:id", generalLimiter, getVideoById);

router.post(
  "/",
  verifyAdmin,
  createVideoValidator,
  validate,
  createVideo
);

router.patch(
  "/:id",
  verifyAdmin,
  updateVideoValidator,
  validate,
  updateVideo
);

router.delete("/:id", verifyAdmin, deleteVideo);

export default router;
