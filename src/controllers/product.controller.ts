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

export const updateProduct = cacheAsync(async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.body.id, req.body, { new: true });
  return res.status(200).json(product);
});

export const deleteProduct = cacheAsync(async (req: Request, res: Response) => {
  return await Product.findByIdAndRemove(req.body.id);
});
