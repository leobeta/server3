import { Router } from 'express';
import UserController from '../controllers/user.controller';
import passport from 'passport';

const router = Router();

const userController = new UserController();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
router.get('/users/:userId', passport.authenticate('jwt', { session: false }), userController.getUser)

export default router;