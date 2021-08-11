"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessOwnerRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_request_1 = require("../middlewares/validate-request");
const businessOwner_controller_1 = require("../controllers/businessOwner.controller");
const auth_1 = require("../dto/auth");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
exports.businessOwnerRouter = router;
router.post("/api/businessowner/register", validate_request_1.validateAuth(auth_1.registerDto), businessOwner_controller_1.createBusinessOwner);
router.post("/api/businessowner/login", validate_request_1.validateAuth(auth_1.authDto), businessOwner_controller_1.loginBusinessOwner);
router.put("/api/businessowner/change-password", validate_request_1.validateAuth(auth_1.changePasswordDto), businessOwner_controller_1.changePassword);
router.get("/api/businessowner/all", businessOwner_controller_1.getAllBusinessOwners);
router.get("/api/businessowner/getuser", authMiddleware_1.getBusinessUser);
router.get("/api/businessowner/:id", businessOwner_controller_1.getBusinessOwnerById);
//# sourceMappingURL=BusinessOwner.js.map