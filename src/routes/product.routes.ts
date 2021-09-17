// import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller';
import ProductController from '../controllers/product.controller';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

const productController = new ProductController();

router
  .route('/product')
  .get(passport.authenticate('jwt', { session: false }), productController.getProducts)
  .post(passport.authenticate('jwt', { session: false }), productController.createProduct)
  .patch(passport.authenticate('jwt', { session: false }), productController.updateProduct)
  .delete(passport.authenticate('jwt', { session: false }), productController.deleteProduct)


export default router;