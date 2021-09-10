import { Request, Response } from 'express';

import Product from '../models/product';
import cacheAsync from '../utils/catchAsync';

export const getProducts = cacheAsync(async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json(products);
});

export const createProduct = cacheAsync(async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const getProductById = cacheAsync(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(400).json({ msg: 'El producto no existe' })
});

export const getProductByName = cacheAsync(async (req: Request, res: Response) => {
  const product = await Product.findOne({ name: req.params.productName });
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(400).json({ msg: 'El producto no existe' })
});

export const updateProduct = cacheAsync(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.body.id, req.body, { new: true });
  return res.status(200).json(product);
});

export const deleteProduct = cacheAsync(async (req: Request, res: Response) => {
  return await Product.findByIdAndRemove(req.params.productId);
});
