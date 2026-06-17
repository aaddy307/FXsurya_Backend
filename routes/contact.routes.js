import express from "express";
import { createContact, getContacts, getContactById, markAsRead } from "../controllers/contact.controller.js";
import verifyAdmin from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { contactValidator } from "../validators/contact.validator.js";
import { generalLimiter, contactLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  contactValidator,
  validate,
  createContact
);

router.get("/", verifyAdmin, generalLimiter, getContacts);
router.get("/:id", verifyAdmin, generalLimiter, getContactById);
router.patch("/:id/read", verifyAdmin, markAsRead);

export default router;
