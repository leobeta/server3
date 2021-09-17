import User, { IUser } from '../models/user';

import Logger from '../utils/logger';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env?.JWT_SECRET || "";
function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: 86400
  });
}

class UserService {

  public signUp = async (us: any) => {
    const user = await User.findOne({ email: us.email });
    if (user) {
      Logger.debug('El usuario ya existe');
      return null;
    }

    const newUser = new User(us);
    await newUser.save();

    return newUser;
  }

  public signIn = async (us: any) => {
    if (!us.email || !us.password) {
      return 'Por favor envia tu correo y contraseña';
    }
    const user = await User.findOne({ email: us.email });
    if (!user) {
      Logger.debug('El usuario no existe');
      return null;
    }

    const isMatch = await user.comparePassword(us.password);
    if (isMatch) {
      return { token: createToken(user), user: user };
    }
    Logger.debug('Email o contraseña son incorrectos')
    return;
  }

  public getUsers = async () => {
    const users = await User.find();
    if (users) {
      return users;
    }
    return 'No existen usuarios'
  }

  public getUser = async (userId: any) => {
    const user = await User.findById(userId);
    if (user) {
      return user;
    }
    return 'El usuario no existe'
  }
}

export default UserService;