"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessStaffRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const businessStaff_controller_1 = require("../controllers/businessStaff.controller");
const businessStaff_dto_1 = require("../dto/businessStaff.dto");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.businessStaffRouter = router;
router.post("/api/business_staff/register", validate_request_1.validateAuth(businessStaff_dto_1.registerDto), businessStaff_controller_1.create);
router.post("/api/business_staff/login", validate_request_1.validateAuth(businessStaff_dto_1.authDto), businessStaff_controller_1.login);
router.put("/api/business_staff/change-password", validate_request_1.validateAuth(businessStaff_dto_1.changePasswordDto), businessStaff_controller_1.changePassword);
router.get("/api/business_staff/all", businessStaff_controller_1.getAll);
router.get("/api/business_staff/get_business_staff", authMiddleware_1.getBusinessStaffUser);
router.get("/api/business_staff/:id", businessStaff_controller_1.getById);
//# sourceMappingURL=BusinessStaff.routes.js.map