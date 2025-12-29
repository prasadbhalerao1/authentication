import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import { createClient } from "redis";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});

await connectDB();

const redisURL = process.env.REDIS_URL;
if (!redisURL) {
  console.log("REDIS_URL is not defined");
  process.exit(1);
}

const redisClient = createClient({
  url: redisURL,
});

export default redisClient;

redisClient
  .connect()
  .then(() => console.log("Redis client connected"))
  .catch((err) => console.log("Error connecting to Redis client ", err));

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//using routes
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
