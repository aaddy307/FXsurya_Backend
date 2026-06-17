import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    enum: ["instagram", "youtube", "twitter", "other"],
    required: true,
  },
  category: {
    type: String,
    enum: ["forex", "crypto", "mindset", "propfirm", "general"],
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

videoSchema.index({ category: 1, isPublished: 1, createdAt: -1 });

export default mongoose.model("Video", videoSchema);
