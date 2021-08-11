import express from "express";
import { validateAuth } from "../middlewares/validate-request";
import {
  create,
  update,
  getById,
  getAll,
  getByBusinessOwnerId,
} from "../controllers/productCategory.controller";
import { createDto, updateDto } from "../dto/productCategory.dto";

const router = express.Router();

router.post("/api/product_category/create", validateAuth(createDto), create);

router.put("/api/product_category/update", validateAuth(updateDto), update);

router.get("/api/product_category/all", getAll);
router.get("/api/product_category/business_owner/:id", getByBusinessOwnerId);

router.get("/api/product_category/:id", getById);

export { router as productCategoryRouter };
