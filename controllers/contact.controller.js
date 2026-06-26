import Contact from "../models/Contact.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, type, company, capitalRange, message } = req.body;

  const contact = new Contact({
    name,
    email,
    phone: phone || "",
    type: type || "general",
    companyName: company || "",
    capitalRange: capitalRange || "",
    message,
  });

  await contact.save();

  ApiResponse.success(res, 201, null, "Message sent successfully");
});

const getContacts = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 10000 } = req.query;
  
  const filter = {};
  if (type) {
    filter.type = type;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const totalPages = Math.ceil(total / parseInt(limit));

  ApiResponse.success(res, 200, {
    contacts,
    total,
    page: parseInt(page),
    totalPages,
  }, "Contacts fetched successfully");
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    throw ApiError.notFound("Contact not found");
  }

  ApiResponse.success(res, 200, contact, "Contact fetched successfully");
});

const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    throw ApiError.notFound("Contact not found");
  }

  contact.isRead = true;
  await contact.save();

  ApiResponse.success(res, 200, contact, "Contact marked as read");
});

export {
  createContact,
  getContacts,
  getContactById,
  markAsRead,
};
