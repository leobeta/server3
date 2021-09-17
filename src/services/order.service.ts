import Logger from '../utils/logger';
import Order from '../models/order';

class OrderService {
  public getOrders = async () => {
    const orders = await Order.find();
    return orders;
  };

  public createOrder = async (ord: any) => {
    try {
      const order = await Order.create(ord);
      return order;
    } catch (error) {
      Logger.error('Create order service', error);
      return error;
    }
  };

  public getOrder = async (orderId: string) => {
    try {
      const order = await Order.findById(orderId)
        .populate({ path: 'user', select: ['name', 'email', 'phone', 'address'] })
        .populate('product')
      return order;
    } catch (error) {
      Logger.error('get an order service', error);
      return error;
    }
  };

  public updateOrder = async (orderId: string, ord: any) => {
    const order = await Order.findByIdAndUpdate(orderId, ord, { new: true });
    return order;
  };

  public deleteOrder = async (orderId: string) => {
    return await Order.findByIdAndRemove(orderId);
  };
}

export default OrderService;