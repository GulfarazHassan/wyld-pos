import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  changePassword,
  create,
  getAll,
  getById,
  login,
} from "../controllers/customer.controller";
import { authDto, changePasswordDto, registerDto } from "../dto/customer.dto";
import { getCustomerUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/api/customer/register", validateAuth(registerDto), create);

router.post("/api/customer/login", validateAuth(authDto), login);

router.put(
  "/api/customer/change-password",
  validateAuth(changePasswordDto),
  changePassword
);

router.get("/api/customer/all", getAll);

router.get("/api/customer/:id", getById);

router.get("/api/customer/getcustomer", getCustomerUser);

export { router as customerRouter };
