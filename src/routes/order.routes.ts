import { createOrder, getOrder, getOrders } from '../controllers/order.controller';

import { Router } from 'express';
import passport from 'passport';

const router = Router();

router
  .route('/order')
  .get(passport.authenticate('jwt', { session: false }), getOrders)
  .post(passport.authenticate('jwt', { session: false }), createOrder);

router
  .route('/order/:orderId')
  .get(passport.authenticate('jwt', { session: false }), getOrder)

export default router;