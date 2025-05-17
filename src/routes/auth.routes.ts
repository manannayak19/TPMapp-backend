//import { config } from "dotenv";
import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
  googleLoginCallBack,
  loginController,
  logOutController,
  registerUserController,
} from "../controllers/auth.controller";
import { registerUserService } from "../services/auth.service";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;
const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", logOutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
  }),
  googleLoginCallBack
);

export default authRoutes;
