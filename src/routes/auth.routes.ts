import { getUser, getUsers, signIn, signUp } from '../controllers/user.controller';

import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/users/:userId', passport.authenticate('jwt', { session: false }), getUser)

export default router;