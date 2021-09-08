import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller';

import { Router } from 'express';
import passport from 'passport';

const router = Router();

router
  .route('/product')
  .get(passport.authenticate('jwt', { session: false }), getProducts)
  .post(passport.authenticate('jwt', { session: false }), createProduct)
  .patch(passport.authenticate('jwt', { session: false }), updateProduct)
  .delete(passport.authenticate('jwt', { session: false }), deleteProduct)


export default router;