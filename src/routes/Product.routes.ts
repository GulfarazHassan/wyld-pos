import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getById,
  getAll,
  getByProductCategoryId,
} from "../controllers/product.controller";
import { createDto, updateDto } from "../dto/product.dto";

const router = express.Router();

router.post("/api/product/create", validateAuth(createDto), create);

router.put("/api/product/update", validateAuth(updateDto), update);

router.get("/api/product/all", getAll);
router.get("/api/product/product_category/:id", getByProductCategoryId);

router.get("/api/product/:id", getById);

export { router as productRouter };
