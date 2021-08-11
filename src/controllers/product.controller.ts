import { Request, Response } from "express";
import { Product } from "../entities/Product";

export const create = async (req: Request, res: Response) => {
  const {
    productCategoryId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
  } = req.body;
  const product = Product.create({
    productCategoryId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
  });

  await product.save();
  return res.status(200).json(product);
};

export const update = async (req: Request, res: Response) => {
  const {
    productId,
    name,
    numberOfVariants,
    variantsText,
    images,
    description,
    price,
  } = req.body;
  const product = await Product.findOne(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  product.name = name || product.name;
  product.numberOfVariants = numberOfVariants || product.numberOfVariants;
  product.variantsText = variantsText || product.variantsText;
  product.images = images || product.images;
  product.description = description || product.description;
  product.price = price || product.price;

  await product.save();
  return res.status(200).json(product);
};

export const getAll = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json(products);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "Product_id required in params" });
  }
  const product = await Product.findOne(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.status(200).json(product);
};

export const getByProductCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "Product_Category id required in params" });
  }
  const product = await Product.find({ productCategoryId: id });
  return res.status(200).json(product);
};
