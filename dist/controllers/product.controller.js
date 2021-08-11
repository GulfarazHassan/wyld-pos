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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByProductCategoryId = exports.getById = exports.getAll = exports.update = exports.create = void 0;
const Product_1 = require("../entities/Product");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productCategoryId, name, numberOfVariants, variantsText, images, description, price, } = req.body;
    const product = Product_1.Product.create({
        productCategoryId,
        name,
        numberOfVariants,
        variantsText,
        images,
        description,
        price,
    });
    yield product.save();
    return res.status(200).json(product);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, name, numberOfVariants, variantsText, images, description, price, } = req.body;
    const product = yield Product_1.Product.findOne(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }
    product.name = name || product.name;
    product.numberOfVariants = numberOfVariants || product.numberOfVariants;
    product.variantsText = variantsText || product.variantsText;
    product.images = images || product.images;
    product.description = description || product.description;
    product.price = price || product.price;
    yield product.save();
    return res.status(200).json(product);
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.Product.find();
    return res.status(200).json(products);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "Product_id required in params" });
    }
    const product = yield Product_1.Product.findOne(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
});
exports.getById = getById;
const getByProductCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "Product_Category id required in params" });
    }
    const product = yield Product_1.Product.find({ productCategoryId: id });
    return res.status(200).json(product);
});
exports.getByProductCategoryId = getByProductCategoryId;
//# sourceMappingURL=product.controller.js.map