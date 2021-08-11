import { Request, Response } from "express";
import { ProductCategory } from "../entities/ProductCategory";

export const create = async (req: Request, res: Response) => {
  const { title, image, businessId } = req.body;
  const product = ProductCategory.create({
    title,
    image,
    businessId,
  });

  const createProduct = await product.save();
  return res.status(200).json(createProduct);
};

export const update = async (req: Request, res: Response) => {
  const { title, image, productCategoryId } = req.body;
  const product: any = await ProductCategory.findOne(productCategoryId);
  if (!product) {
    return res.status(404).json({ message: `Product_Category not found` });
  }
  product.title = title || product.title;
  product.image = image || product.image;
  await product.save();
  return res.status(200).json(product);
};

export const getAll = async (req: Request, res: Response) => {
  const products = await ProductCategory.find();
  return res.status(200).json(products);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "Product_Category id required in params" });
  }
  const product = await ProductCategory.findOne(id);
  if (!product) {
    return res.status(404).json({ message: "Product Category not found" });
  }
  return res.status(200).json(product);
};

export const getByBusinessOwnerId = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ message: "businessOwner id required in params" });
  }
  const product = await ProductCategory.find({ businessId: id });
  return res.status(200).json(product);
};
