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
exports.getByBusinessOwnerId = exports.getById = exports.getAll = exports.update = exports.create = void 0;
const ProductCategory_1 = require("../entities/ProductCategory");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, businessId } = req.body;
    const product = ProductCategory_1.ProductCategory.create({
        title,
        image,
        businessId,
    });
    const createProduct = yield product.save();
    return res.status(200).json(createProduct);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, productCategoryId } = req.body;
    const product = yield ProductCategory_1.ProductCategory.findOne(productCategoryId);
    if (!product) {
        return res.status(404).json({ message: `Product_Category not found` });
    }
    product.title = title || product.title;
    product.image = image || product.image;
    yield product.save();
    return res.status(200).json(product);
});
exports.update = update;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductCategory_1.ProductCategory.find();
    return res.status(200).json(products);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "Product_Category id required in params" });
    }
    const product = yield ProductCategory_1.ProductCategory.findOne(id);
    if (!product) {
        return res.status(404).json({ message: "Product Category not found" });
    }
    return res.status(200).json(product);
});
exports.getById = getById;
const getByBusinessOwnerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.json({ message: "businessOwner id required in params" });
    }
    const product = yield ProductCategory_1.ProductCategory.find({ businessId: id });
    return res.status(200).json(product);
});
exports.getByBusinessOwnerId = getByBusinessOwnerId;
//# sourceMappingURL=productCategory.controller.js.map