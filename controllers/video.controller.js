import Video from "../models/Video.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import detectPlatform from "../utils/detectPlatform.js";

const getVideos = asyncHandler(async (req, res) => {
  const { category, limit = 12, page = 1, platform } = req.query;
  
  const filter = { isPublished: true };
  
  if (category && category !== "all") {
    filter.category = category.toLowerCase();
  }
  
  if (platform) {
    filter.platform = platform.toLowerCase();
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Video.countDocuments(filter);
  const videos = await Video.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalPages = Math.ceil(total / parseInt(limit));
  const hasMore = skip + videos.length < total;

  ApiResponse.success(res, 200, {
    videos,
    total,
    page: parseInt(page),
    totalPages,
    hasMore,
  }, "Videos fetched successfully");
});

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  
  if (!video) {
    throw ApiError.notFound("Video not found");
  }

  ApiResponse.success(res, 200, video, "Video fetched successfully");
});

const createVideo = asyncHandler(async (req, res) => {
  const { title, description, url, platform, category, thumbnail, isPublished, createdAt } = req.body;
  
  let detectedPlatform = platform;
  if (!detectedPlatform) {
    detectedPlatform = detectPlatform(url);
  }

  const video = new Video({
    title,
    description,
    url,
    platform: detectedPlatform,
    category: category ? category.toLowerCase() : "general",
    thumbnail: thumbnail || null,
    isPublished: isPublished !== undefined ? isPublished : true,
    createdAt: createdAt || undefined,
  });

  await video.save();

  ApiResponse.success(res, 201, video, "Video created successfully");
});

const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  
  if (!video) {
    throw ApiError.notFound("Video not found");
  }

  const { url, platform, category } = req.body;
  
  if (url && !platform && url !== video.url) {
    req.body.platform = detectPlatform(url);
  }
  
  if (category) {
    req.body.category = category.toLowerCase();
  }

  Object.assign(video, req.body);
  await video.save();

  ApiResponse.success(res, 200, video, "Video updated successfully");
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  
  if (!video) {
    throw ApiError.notFound("Video not found");
  }

  await video.deleteOne();

  ApiResponse.success(res, 200, null, "Video deleted successfully");
});

export {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};
