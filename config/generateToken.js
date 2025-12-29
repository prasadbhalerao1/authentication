import jwt from "jsonwebtoken";
import redisClient from "../index.js";

export const generateToken = async (id, res) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });

  const refreshTokenKey = `refresh_token:${id}`;

  await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // accessible only by server (It is fine if its false but XXS attacks can happen)
    // secure: true, // accessible only on https (commented because of localhost)
    sameSite: "strict", // accessible only on same site only
    maxAge: 1 * 60 * 1000, // 1 minute
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // accessible only by server
    // secure: true, // accessible only on https (commented because of localhost)
    sameSite: "strict", // accessible only on same site only
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};

export default generateToken;
