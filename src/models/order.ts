import { Document, PopulatedDoc, Schema, model } from 'mongoose';

import { IProduct } from './product';
import { IUser } from './user';

export enum ProductStatus {
  received = 'recibido',
  preparing = 'preparando',
  ready = 'listo'
}

export enum DeliveryStatus {
  received = 'recibido',
  ontheway = 'repartiendo',
  delivered = 'entregado'
}

export enum OrderStatus {
  received = 'recibida',
  cancelled = 'cancelado',
  payment = 'pagada'
}

export enum PaymentType {
  cash = 'Efectivo',
  bankTransfer = 'Transferencia'
}

export interface IOrder extends Document {
  user: IUser['_id'],
  item: IItem[],
  address: string,
  reference: string,
  status: IOrderStatus,
  delivery: IDelivery,
  createdAt: Date,
  modifiedAt: Date,
}

export interface IOrderStatus {
  status: OrderStatus,
  paymentType: PaymentType,
}
export interface IItem {
  product: IProduct['_id'],
  quantity: number
  status: ProductStatus
}

export interface IDelivery {
  isDelivery: boolean,
  status: DeliveryStatus
  price: number
}

const orderSchema: Schema<IOrder> = new Schema({
  user:
    { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  item: {
    type: Schema.Types.Mixed,
    required: true
  },
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  reference: {
    type: String
  },
  status: {
    type: Schema.Types.Mixed,
    required: true
  },
  delivered: {
    type: Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  modifiedAt: {
    type: Date
  }
});

export default model<IOrder>("Orders", orderSchema);
