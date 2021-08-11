"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const productCategory_controller_1 = require("../controllers/productCategory.controller");
const productCategory_dto_1 = require("../dto/productCategory.dto");
const router = express_1.default.Router();
exports.productCategoryRouter = router;
router.post("/api/product_category/create", validate_request_1.validateAuth(productCategory_dto_1.createDto), productCategory_controller_1.create);
router.put("/api/product_category/update", validate_request_1.validateAuth(productCategory_dto_1.updateDto), productCategory_controller_1.update);
router.get("/api/product_category/all", productCategory_controller_1.getAll);
router.get("/api/product_category/business_owner/:id", productCategory_controller_1.getByBusinessOwnerId);
router.get("/api/product_category/:id", productCategory_controller_1.getById);
//# sourceMappingURL=ProductCategory.routes.js.map