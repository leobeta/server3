import { Document, PopulatedDoc, Schema, model } from 'mongoose';

import { IProduct } from './product';
import { IUser } from './user';

export interface IOrder extends Document {
  user: IUser['_id'],
  order: IItem[],
  address: string,
  reference: string,
  createdAt: Date,
  modifiedAt: Date,
}

export interface IItem {
  product: IProduct['_id'],
  quantity: number
}

const orderSchema: Schema<IOrder> = new Schema({
  user:
    { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  order: {
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
