import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";
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

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("Please upload an image file");
  }

  const uploadPromise = () => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "fx-surya",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });
  };

  try {
    const result = await uploadPromise();
    ApiResponse.success(
      res,
      200,
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      "Image uploaded successfully"
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw ApiError.internal("Failed to upload image to Cloudinary");
  }
});

export {
  login,
  getMe,
  getStats,
  uploadImage,
};
