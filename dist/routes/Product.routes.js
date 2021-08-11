"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const product_controller_1 = require("../controllers/product.controller");
const product_dto_1 = require("../dto/product.dto");
const router = express_1.default.Router();
exports.productRouter = router;
router.post("/api/product/create", validate_request_1.validateAuth(product_dto_1.createDto), product_controller_1.create);
router.put("/api/product/update", validate_request_1.validateAuth(product_dto_1.updateDto), product_controller_1.update);
router.get("/api/product/all", product_controller_1.getAll);
router.get("/api/product/product_category/:id", product_controller_1.getByProductCategoryId);
router.get("/api/product/:id", product_controller_1.getById);
//# sourceMappingURL=Product.routes.js.map