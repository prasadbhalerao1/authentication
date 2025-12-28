import tryCatch from "../middleware/tryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema, loginSchema } from "../config/zod.js";
import redisClient from "../index.js";
import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../config/sendMail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";
import { json } from "zod";

export const registerUser = tryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  if (sanitizedBody.email) {
    sanitizedBody.email = String(sanitizedBody.email).trim().toLowerCase();
  }

  const validation = registerSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstError = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unkown",
        message: issue.message || "validation failed",
        code: issue.code,
      }));
      firstError = allErrors[0]?.message || "Validation failed";
    }

    return res
      .status(400)
      .json({ message: "Validation failed", error: allErrors });
  }

  const { name, email, password } = validation.data;

  // Rate Limit
  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

  if (await redisClient.get(rateLimitKey)) {
    return res
      .status(429)
      .json({ message: "Too many requests, try again later..." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const verifyKey = `verify:${verifyToken}`;

  const dataToStore = JSON.stringify({
    name,
    email,
    password: hashedPassword,
  });

  await redisClient.set(verifyKey, dataToStore, { EX: 300 });

  const subject = "Verify your email address";
  const html = getVerifyEmailHtml({ email, token: verifyToken });

  await sendMail({ email, subject, html });

  await redisClient.set(rateLimitKey, "true ", { EX: 60 });

  res.json({
    message:
      "If your email is valid, a verfication link has been sent. It will expire in 5 minutes",
  });
});

export const verifyUser = tryCatch(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const verifyKey = `verify:${token}`;

  const userDataJson = await redisClient.get(verifyKey);

  if (!userDataJson) {
    return res.status(400).json({ message: "Invalid token" });
  }

  await redisClient.del(verifyKey);

  const userData = JSON.parse(userDataJson);
  console.log(userData);

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  res.status(201).json({
    message: "User created successfully",
    user: { _id: newUser._id, email: newUser.email, name: newUser.name },
  });
});

export const loginUser = tryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  if (sanitizedBody.email) {
    sanitizedBody.email = String(sanitizedBody.email).trim().toLowerCase();
  }

  const validation = loginSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstError = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unkown",
        message: issue.message || "validation failed",
        code: issue.code,
      }));
      firstError = allErrors[0]?.message || "Validation failed";
    }

    return res
      .status(400)
      .json({ message: "Validation failed", error: allErrors });
  }

  const { email, password } = validation.data;

  const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;

  if (await redisClient.get(rateLimitKey)) {
    return res
      .status(429)
      .json({ message: "Too many requests, try again later..." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const camparePassword = await bcrypt.compare(password, user.password);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpKey = `otp:${email}`;

  await redisClient.set(otpKey, JSON.stringify(otp), { EX: 300 });

  const subject = "Verify your email address";
  const html = getOtpHtml({ email, otp });

  await sendMail({ email, subject, html });

  await redisClient.set(rateLimitKey, "true ", { EX: 60 });

  res.json({
    message: "If email is valid, OTP is sent. It will expire in 5 minutes",
  });
});

export const verifyOtp = tryCatch(async (req, res) => {

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const otpKey = `otp:${email}`;

  const storedOtp = await redisClient.get(otpKey);

  if (!storedOtp) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  const parsedOtp = JSON.parse(storedOtp);

  if (parsedOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await redisClient.del(otpKey);

  let user = await User.findOne({ email });

  
});