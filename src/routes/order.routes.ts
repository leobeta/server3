import OrderController from '../controllers/order.controller';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

const orderController = new OrderController();

router
  .route('/order')
  .get(passport.authenticate('jwt', { session: false }), orderController.getOrders)
  .post(passport.authenticate('jwt', { session: false }), orderController.createOrder);

router
  .route('/order/:orderId')
  .get(passport.authenticate('jwt', { session: false }), orderController.getOrder);

export default router;