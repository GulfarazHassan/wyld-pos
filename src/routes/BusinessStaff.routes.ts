import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  changePassword,
  create,
  getAll,
  getById,
  login,
} from "../controllers/businessStaff.controller";
import {
  authDto,
  changePasswordDto,
  registerDto,
} from "../dto/businessStaff.dto";
import { getBusinessStaffUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/business_staff/register", validateAuth(registerDto), create);

router.post("/api/business_staff/login", validateAuth(authDto), login);

router.put(
  "/api/business_staff/change-password",
  validateAuth(changePasswordDto),
  changePassword
);

router.get("/api/business_staff/all", getAll);
router.get("/api/business_staff/get_business_staff", getBusinessStaffUser);
router.get("/api/business_staff/:id", getById);

export { router as businessStaffRouter };
