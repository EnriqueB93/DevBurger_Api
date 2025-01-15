import { Sequelize } from 'sequelize';

import Category from '../app/models/Category';
import User from '../app/models/User';
import Product from '../app/models/product';
import configDatabase from '../config/database';

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			.map(
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				(model) => model.associate && model.associate(this.connection.models),
			);
	}
}

export default new Database();
