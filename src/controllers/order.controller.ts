import { Request, Response } from 'express';

import Order from '../models/order';
import User from '../models/user';
import cacheAsync from '../utils/catchAsync';

export const getOrders = cacheAsync(async (req: Request, res: Response) => {
  const orders = await Order.find();
  return res.status(200).json(orders);
});

export const createOrder = cacheAsync(async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const getOrder = cacheAsync(async (req: any, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate({ path: 'user', select: ['name', 'email', 'phone', 'address'] })
      .populate('product')
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export const updateOrder = cacheAsync(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndUpdate(req.body.id, req.body, { new: true });
  return res.status(200).json(order);
});

export const deleteOrder = cacheAsync(async (req: Request, res: Response) => {
  return await Order.findByIdAndRemove(req.params.orderId);
});