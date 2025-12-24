import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB ...");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
