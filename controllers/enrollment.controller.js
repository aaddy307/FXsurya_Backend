import Enrollment from "../models/Enrollment.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createEnrollment = asyncHandler(async (req, res) => {
  const { name, email, phone, plan } = req.body;

  if (!name || !email || !phone || !plan) {
    throw ApiError.badRequest("All fields are required");
  }

  if (!["monthly", "lifetime"].includes(plan.toLowerCase())) {
    throw ApiError.badRequest("Invalid plan. Must be 'monthly' or 'lifetime'");
  }

  const amount = plan.toLowerCase() === "monthly" ? 4999 : plan.toLowerCase() === "lifetime" ? 14999 : 0;

  const enrollment = new Enrollment({
    name,
    email,
    phone,
    plan: plan.toLowerCase(),
    amount,
    razorpayOrderId: `manual_${Date.now()}`,
    status: "paid",
  });

  await enrollment.save();

  ApiResponse.success(res, 201, {
    enrollment,
  }, "Enrollment created successfully");
});

const getEnrollments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  
  const filter = {};
  if (status) {
    filter.status = status;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Enrollment.countDocuments(filter);
  const enrollments = await Enrollment.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalPages = Math.ceil(total / parseInt(limit));

  ApiResponse.success(res, 200, {
    enrollments,
    total,
    page: parseInt(page),
    totalPages,
  }, "Enrollments fetched successfully");
});

const getEnrollmentById = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);
  
  if (!enrollment) {
    throw ApiError.notFound("Enrollment not found");
  }

  ApiResponse.success(res, 200, enrollment, "Enrollment fetched successfully");
});

export {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
};
