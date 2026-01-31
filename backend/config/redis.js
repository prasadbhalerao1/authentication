import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const redisURL = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: redisURL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
