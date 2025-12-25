import tryCatch from "../middleware/tryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema } from "../config/zod.js";
import redisClient from "../index.js";
import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../config/sendMail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";

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

  const dataToStore= JSON.stringify({
    name,
    email,
    password:hashedPassword,
  });

  await redisClient.set(verifyKey, dataToStore, {EX: 300});

  const subject = "Verify your email address";
  const html = getVerifyEmailHtml({ email, token: verifyToken });

  await sendMail({ email, subject, html });

  await redisClient.set(rateLimitKey, "true ", { EX: 60 });

  res.json({ 
    message:"If your email is valid, a verfication link has been sent. It will expire in 5 minutes",
   });
});
