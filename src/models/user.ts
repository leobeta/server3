import { Document, Schema, model } from "mongoose";

import bcrypt from "bcrypt";

export enum Role {
  admin = 'admin',
  user = 'user',
  guest = 'guest'
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  type: Role;
  comparePassword: (password: string) => Promise<Boolean>
};

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  type: {
    type: String,
    required: true,
    default: 'user'
  }
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
};

export default model<IUser>("User", userSchema);