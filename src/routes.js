import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './middleware/auth.js';

import CategoryControlle from './app/controllers/CategoryControlle.js';
import ProductsController from './app/controllers/ProductsController.js';
import SessionController from './app/controllers/SessionConhtroller.js';
import UserController from './app/controllers/UserController.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductsController.store);
routes.get('/products', ProductsController.index);

routes.post('/categories', CategoryControlle.store);
routes.get('/categories', CategoryControlle.index);

export default routes;
