import { body } from "express-validator";

export const createVideoValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title must be at most 150 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
  body("url")
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Invalid URL format"),
  body("category")
    .isIn(["forex", "crypto", "mindset", "propfirm", "general"])
    .withMessage("Invalid category"),
  body("platform")
    .optional()
    .isIn(["instagram", "youtube", "twitter", "other"])
    .withMessage("Invalid platform"),
  body("thumbnail")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value || value === "") return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error("Invalid thumbnail URL");
      }
    }),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
  body("createdAt")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid date format"),
];

export const updateVideoValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Title must be at most 150 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
  body("url")
    .optional()
    .isURL()
    .withMessage("Invalid URL format"),
  body("category")
    .optional()
    .isIn(["forex", "crypto", "mindset", "propfirm", "general"])
    .withMessage("Invalid category"),
  body("platform")
    .optional()
    .isIn(["instagram", "youtube", "twitter", "other"])
    .withMessage("Invalid platform"),
  body("thumbnail")
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      if (!value || value === "") return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error("Invalid thumbnail URL");
      }
    }),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean"),
  body("createdAt")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid date format"),
];
