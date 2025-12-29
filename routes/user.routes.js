import express from "express";
import {
  registerUser,
  verifyUser,
  loginUser,
  verifyOtp,
  myProfile,
  refreshToken,
  logoutUser,
} from "../controllers/user.controllers.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/verify", verifyOtp);
router.get("/me", isAuth, myProfile);
router.post("/refresh", refreshToken);
router.post("/logout", isAuth, logoutUser);

export default router;
