import Logger from '../utils/logger';
import Product from '../models/product';

class ProductService {
  public getProducts = async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      Logger.error('Get products service', error);
      return error;
    }
  };

  public createProduct = async (prod: any) => {
    try {
      const product = await Product.create(prod);
      return product;
    } catch (error) {
      Logger.error('Create product service', error);
      return error;
    }
  };

  public getProductById = async (productId: string) => {
    const product = await Product.findById(productId);
    if (product) {
      return product;
    }
    return null;
  };

  public getProductByName = async (productName: string) => {
    const product = await Product.findOne({ name: productName });
    if (product) {
      return product;
    }
    return null;
  };

  public updateProduct = async (productId: string, prod: any) => {
    const product = await Product.findByIdAndUpdate(productId, prod, { new: true });
    return product;
  };

  public deleteProduct = async (productId: any) => {
    return await Product.findByIdAndRemove(productId);
  };
}

export default ProductService;
