import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middleware/auth.js';
import multerConfig from './config/multer';

import CategoryControlle from './app/controllers/CategoryControlle.js';
import OrderController from './app/controllers/OrderController.js';
import ProductsController from './app/controllers/ProductsController.js';
import SessionController from './app/controllers/SessionConhtroller.js';
import UserController from './app/controllers/UserController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductsController.store);
routes.get('/products', ProductsController.index);
routes.put('/products/:id', upload.single('file'), ProductsController.update);

routes.post('/categories', upload.single('file'), CategoryControlle.store);
routes.get('/categories', CategoryControlle.index);
routes.put('/categories/:id', upload.single('file'), CategoryControlle.update);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
