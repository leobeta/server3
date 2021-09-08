import { Router } from 'express';
import passport from 'passport';
import { special } from '../controllers/special.controller';

const router = Router();

router.get('/special', passport.authenticate('jwt', { session: false }), special);

export default router;