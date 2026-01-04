import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const redisURL = process.env.REDIS_URL;

if (!redisURL) {
  console.error("REDIS_URL is not defined in environment variables");
}

export const redisClient = createClient({
  url: redisURL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
