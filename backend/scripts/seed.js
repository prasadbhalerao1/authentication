import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from one level up
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const users = [];
    // Generate 15 users
    for (let i = 0; i < 15; i++) {
      const password = await bcrypt.hash("password123", 10);
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: "user",
        isVerified: true,
      });
    }

    await User.insertMany(users);
    console.log("Successfully seeded 15 users!");

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
