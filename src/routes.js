import { Router } from 'express';
import ProductsController from './app/controllers/ProductsController';
import SessionController from './app/controllers/SessionConhtroller';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/products', ProductsController.store);

export default routes;
