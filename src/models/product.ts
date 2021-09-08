import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string,
  price: number,
  weight: number,
  discount: number,
  createdAt: Date,
  modifiedAt: Date,
}

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number
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

productSchema.pre<IProduct>('save', async function (next) {
  if (this.isModified()) {
    this.modifiedAt = new Date();
  }
  next();
});

export default model<IProduct>("Product", productSchema);