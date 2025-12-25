import tryCatch from "../middleware/tryCatch.js";
import sanitize from "mongo-sanitize";
import { registerSchema } from "../config/zod.js";
import redisClient from "../index.js";

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
  if(await redisClient.get(rateLimitKey)) {
    return res.status(429).json({ message: "Too many requests, try again later..." });
  }

  res.json({ name, email, password });
});
