import jwt from "jsonwebtoken";
import redisClient from "../index.js";
import { User } from "../models/users.models.js";

export const isAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(403).json({ message: "Unauthorized- Please login" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Token expired" });
    }

    const cacheUser = await redisClient.get(`user:${decoded.id}`);

    if (cacheUser) {
      req.user = JSON.parse(cacheUser);
      return next();
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(user));
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
