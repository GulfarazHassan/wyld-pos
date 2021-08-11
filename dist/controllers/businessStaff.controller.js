"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getById = exports.changePassword = exports.login = exports.create = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const BusinessStaff_1 = require("../entities/BusinessStaff");
const BusinessOwner_1 = require("../entities/BusinessOwner");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profileImagePath, businessStaffId } = req.body;
    const businessOwner = yield BusinessOwner_1.BusinessOwner.findOne(businessStaffId);
    if (!businessOwner) {
        return res.status(400).json({
            message: `Business_Owner with this id=${businessStaffId} not exists`,
        });
    }
    const businessStaffExist = yield BusinessStaff_1.BusinessStaff.findOne({ email: email });
    if (businessStaffExist) {
        return res.status(400).json({
            message: `Business_Staff with this email=${email} already exists`,
        });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const createBusinessStaff = BusinessStaff_1.BusinessStaff.create({
        name,
        email,
        password: hashPassword,
        profileImagePath,
        businessOwner: businessOwner,
    });
    yield createBusinessStaff.save();
    return res.json({
        id: createBusinessStaff.id,
        businessName: createBusinessStaff.name,
        email: createBusinessStaff.email,
        profileImagePath: createBusinessStaff.profileImagePath,
        token: generateToken_1.default(createBusinessStaff.id),
        businessOwner: createBusinessStaff.businessOwner,
    });
});
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const businessStaff = yield BusinessStaff_1.BusinessStaff.findOne({ email: email });
    if (!businessStaff) {
        return res.status(400).json({
            message: `Business_Staff with this email=${email} not exists`,
        });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(password, businessStaff.password);
    if (compairPasswords) {
        return res.json({
            businessName: businessStaff.name,
            email: businessStaff.email,
            profileImagePath: businessStaff.profileImagePath,
            token: generateToken_1.default(businessStaff.id),
        });
    }
    else {
        return res.json({
            message: "Email or password incorrect",
        });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, oldPassword } = req.body;
    const user = yield BusinessStaff_1.BusinessStaff.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json({ message: `Business_Staff agains ${email} not exists.` });
    }
    const compairPasswords = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!compairPasswords) {
        return res.status(401).json({ message: `Wrong old password` });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(newPassword, salt);
    user.password = hashPassword;
    yield user.save();
    return res.status(200).json({ message: `Password updated` });
});
exports.changePassword = changePassword;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: `Missing id in params` });
    }
    const user = yield BusinessStaff_1.BusinessStaff.findOne(id);
    console.log("sadsa :: ", user);
    if (!user) {
        return res
            .status(404)
            .json({ message: `Business_Staff agains ${id} not exists.` });
    }
    return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        profileImagePath: user.profileImagePath,
    });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield BusinessStaff_1.BusinessStaff.find();
    return res.status(200).json({
        business_staff: users,
    });
});
exports.getAll = getAll;
//# sourceMappingURL=businessStaff.controller.js.map