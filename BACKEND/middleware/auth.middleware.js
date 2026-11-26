import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const [scheme, token] = authHeader?.split(" ") || [];
    if (scheme.toLowerCase() !== "bearer" || !token) {
      return res.status(401).json({ message: "Invalid authentication format" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: error.message });
  }
  next();
};

export default authMiddleware;
