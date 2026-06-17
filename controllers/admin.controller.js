import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Video from "../models/Video.js";
import Contact from "../models/Contact.js";
import Enrollment from "../models/Enrollment.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  
  if (!admin) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const isMatch = await admin.comparePassword(password);
  
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  ApiResponse.success(res, 200, {
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  }, "Login successful");
});

const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");
  
  if (!admin) {
    throw ApiError.notFound("Admin not found");
  }

  ApiResponse.success(res, 200, admin, "Admin retrieved successfully");
});

const getStats = asyncHandler(async (req, res) => {
  const [
    totalVideos,
    publishedVideos,
    totalContacts,
    unreadContacts,
    totalEnrollments,
    totalPartnerships,
    recentContacts,
    recentEnrollments,
  ] = await Promise.all([
    Video.countDocuments(),
    Video.countDocuments({ isPublished: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),
    Enrollment.countDocuments({ status: "paid" }),
    Contact.countDocuments({ type: "partnership" }),
    Contact.find().sort({ createdAt: -1 }).limit(5),
    Enrollment.find({ status: "paid" }).sort({ createdAt: -1 }).limit(5),
  ]);

  ApiResponse.success(res, 200, {
    totalVideos,
    publishedVideos,
    totalContacts,
    unreadContacts,
    totalEnrollments,
    totalPartnerships,
    recentContacts,
    recentEnrollments,
  }, "Stats retrieved successfully");
});

export {
  login,
  getMe,
  getStats,
};
