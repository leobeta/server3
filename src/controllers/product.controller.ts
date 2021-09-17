import { Request, Response } from 'express';

import ProductService from '../services/product.service';
import cacheAsync from '../utils/catchAsync';

const productService = new ProductService();
class ProductController {

  public getProducts = cacheAsync(async (req: Request, res: Response) => {
    const products = await productService.getProducts;
    return res.status(200).json(products);
  });

  public createProduct = cacheAsync(async (req: Request, res: Response) => {
    try {
      const product = await productService.createProduct(req.body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

  public getProductById = cacheAsync(async (req: Request, res: Response) => {
    const product = await productService.getProductById(req.params.productId);
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(400).json({ msg: 'El producto no existe' })
  });

  public getProductByName = cacheAsync(async (req: Request, res: Response) => {
    const product = await productService.getProductByName(req.params.productName);
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(400).json({ msg: 'El producto no existe' })
  });

  public updateProduct = cacheAsync(async (req: Request, res: Response) => {
    const product = await productService.updateProduct(req.body.id, req.body);
    return res.status(200).json(product);
  });

  public deleteProduct = cacheAsync(async (req: Request, res: Response) => {
    return await productService.deleteProduct(req.params.productId);
  });
}

export default ProductController;