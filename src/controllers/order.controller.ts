import { Request, Response } from 'express';

import Order from '../models/order';
import OrderService from '../services/order.service';
import cacheAsync from '../utils/catchAsync';

const orderService = new OrderService();
class OrderController {

  public getOrders = cacheAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getOrders;
    return res.status(200).json(orders);
  });

  public createOrder = cacheAsync(async (req: Request, res: Response) => {
    try {
      const order = await orderService.createOrder(req.body);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

  public getOrder = cacheAsync(async (req: any, res: Response) => {
    try {
      const order = await orderService.getOrder(req.params.orderId);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

  public updateOrder = cacheAsync(async (req: Request, res: Response) => {
    const order = await orderService.updateOrder(req.body.id, req.body);
    return res.status(200).json(order);
  });

  public deleteOrder = cacheAsync(async (req: Request, res: Response) => {
    return await orderService.deleteOrder(req.params.orderId);
  });
}

export default OrderController;