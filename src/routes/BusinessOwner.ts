import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  changePassword,
  createBusinessOwner,
  getAllBusinessOwners,
  getBusinessOwnerById,
  loginBusinessOwner,
} from "../controllers/businessOwner.controller";
import { authDto, changePasswordDto, registerDto } from "../dto/auth";
import { getBusinessUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/api/businessowner/register",
  validateAuth(registerDto),
  createBusinessOwner
);

router.post(
  "/api/businessowner/login",
  validateAuth(authDto),
  loginBusinessOwner
);

router.put(
  "/api/businessowner/change-password",
  validateAuth(changePasswordDto),
  changePassword
);

router.get("/api/businessowner/all", getAllBusinessOwners);
router.get("/api/businessowner/getuser", getBusinessUser);
router.get("/api/businessowner/:id", getBusinessOwnerById);

export { router as businessOwnerRouter };
