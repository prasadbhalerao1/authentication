import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  verifyOtp,
  myProfile,
} from "../controllers/user.controllers.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/verify", verifyOtp);
router.get("/me", isAuth, myProfile);

export default router;
