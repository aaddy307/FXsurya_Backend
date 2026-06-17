import { body } from "express-validator";

export const createEnrollmentValidator = [
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
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone must be between 10 and 15 characters"),
  body("plan")
    .notEmpty()
    .withMessage("Plan is required")
    .isIn(["monthly", "lifetime"])
    .withMessage("Plan must be 'monthly' or 'lifetime'"),
];

export default createEnrollmentValidator;
