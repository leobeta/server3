import authRotes from './routes/auth.routes';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import orderRoutes from './routes/order.routes';
import passport from 'passport';
import passportMiddleware from "./middlewares/passport";
import productRoutes from './routes/product.routes';
import specialRoutes from './routes/special.routes';

// initializations
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/', (req, res) => {
  res.send(`The API is at http://localhost:${process.env.PORT}`);
})

app.use(authRotes);
app.use(specialRoutes);
app.use(productRoutes);
app.use(orderRoutes);

export default app;