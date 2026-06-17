import { body } from "express-validator";

export const contactValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
  body("type")
    .optional()
    .isIn(["general", "partnership", "student"])
    .withMessage("Invalid contact type"),
  body("phone")
    .optional()
    .isString()
    .trim(),
  body("company")
    .optional()
    .isString()
    .trim(),
  body("capitalRange")
    .optional()
    .isString()
    .trim(),
];

export default contactValidator;
