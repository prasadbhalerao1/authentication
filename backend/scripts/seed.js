import mongoose from "mongoose";
import { User } from "../models/user.model.js";
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
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERNAuthentication",
    });
    console.log("Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    const password = await bcrypt.hash("123456", 10);

    const specificUsers = [
      {
        name: "ADMIN-MAIN",
        email: "admin@main.com",
        password: password,
        role: "admin",
        isVerified: true,
      },
      {
        name: "USER",
        email: "user@main.com",
        password: password,
        role: "user",
        isVerified: true,
      },
    ];

    const randomUsers = [];
    for (let i = 0; i < 10; i++) {
      randomUsers.push({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        role: "user",
        isVerified: true,
      });
    }

    const allUsers = [...specificUsers, ...randomUsers];

    await User.insertMany(allUsers);
    console.log(`Successfully seeded ${allUsers.length} users!`);
    console.log("Admin Creds: admin@main.com / 123456");
    console.log("User Creds: user@main.com / 123456");

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
