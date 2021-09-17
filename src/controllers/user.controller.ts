import { Request, Response } from 'express';

import Logger from '../utils/logger';
import UserService from '../services/user.service';
import cacheAsync from '../utils/catchAsync';

const userService = new UserService();
class UserController {
  public signUp = cacheAsync(async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Por favor envia tu correo y contraseña' });
    }
    const user = await userService.signUp(req.body);
    if (user) {
      return res.status(201).json(user);
    }
    return res.status(400).json('Hubo un problema con la creacion del usuario.')
  });

  public signIn = cacheAsync(async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Por favor envia tu correo y contraseña' });
    }

    const user = await userService.signIn(req.body);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400).json({ msg: 'Hubo un problema con el usuario' });
  });

  public getUsers = cacheAsync(async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    if (users) {
      return res.status(200).json(users);
    }
    return res.status(400).json({ msg: 'No existen usuarios' })
  })

  public getUser = cacheAsync(async (req: Request, res: Response) => {
    const user = await userService.getUser(req.params.userId);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: 'El usuario no existe' })
  })
}

export default UserController;