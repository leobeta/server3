import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

import cacheAsync from '../utils/catchAsync';
import config from '../config/config'
import jwt from 'jsonwebtoken';

function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Por favor envia tu correo y contraseña' });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: 'Usuario ya existe!' })
  }

  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Por favor envia tu correo y contraseña' });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res.status(200).json({ token: createToken(user) })
  }

  return res.status(400).json('Email o contraseña son incorrectos');
}

export const getUsers = cacheAsync(async (req: Request, res: Response) => {
  const users = await User.find();
  if (users) {
    return res.status(200).json(users);
  }
  return res.status(400).json({ msg: 'No existen usuarios' })
})

export const getUser = cacheAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ msg: 'El usuario no existe' })
})
