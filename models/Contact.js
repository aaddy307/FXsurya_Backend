import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["general", "partnership", "student"],
    default: "general",
  },
  companyName: {
    type: String,
    default: "",
  },
  capitalRange: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

contactSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model("Contact", contactSchema);
