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
const Customer_1 = require("../entities/Customer");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profileImagePath } = req.body;
    const customerExist = yield Customer_1.Customer.findOne({ email: email });
    if (customerExist) {
        return res
            .status(400)
            .json({ message: "Customer with this email already exists" });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    const customer = Customer_1.Customer.create({
        name,
        email,
        password: hashPassword,
        profileImagePath,
    });
    yield customer.save();
    return res.status(200).json({
        id: customer.id,
        businessName: customer.name,
        email: customer.email,
        profileImagePath: customer.profileImagePath,
        token: generateToken_1.default(customer.id),
    });
});
exports.create = create;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const customer = yield Customer_1.Customer.findOne({ email: email });
    const compairPasswords = yield bcryptjs_1.default.compare(password, customer.password);
    if (compairPasswords) {
        return res.json({
            businessName: customer.name,
            email: customer.email,
            profileImagePath: customer.profileImagePath,
            token: generateToken_1.default(customer.id),
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
    const user = yield Customer_1.Customer.findOne({ email });
    if (!user) {
        return res
            .status(404)
            .json({ message: `User agains ${email} not exists.` });
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
    const businessOwner = yield Customer_1.Customer.findOne(id);
    if (!businessOwner) {
        return res.status(404).json({ message: `User agains ${id} not exists.` });
    }
    return res.json({
        id: businessOwner.id,
        name: businessOwner.name,
        email: businessOwner.email,
        profileImagePath: businessOwner.profileImagePath,
    });
});
exports.getById = getById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield Customer_1.Customer.find();
    return res.json({
        customers,
    });
});
exports.getAll = getAll;
//# sourceMappingURL=customer.controller.js.map