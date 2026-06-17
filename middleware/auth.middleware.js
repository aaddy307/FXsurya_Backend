import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access token is required");
    }

    const token = authHeader.split(" ")[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      throw ApiError.unauthorized("Invalid or expired token");
    }
  } catch (error) {
    next(error);
  }
};

export default verifyAdmin;
