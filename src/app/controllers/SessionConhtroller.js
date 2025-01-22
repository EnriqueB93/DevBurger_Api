import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';
class SessionController {
	async store(request, response) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		const isValid = await schema.isValid(request.body);

		const emailOrPasswordIncorrect = () => {
			return response
				.status(401)
				.json({ error: 'your password or email isen`t correct' });
		};

		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		const { email, password } = request.body;

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			return emailOrPasswordIncorrect();
		}

		const isSamePassword = await user.checkPassword(password);

		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email,
			admin: user.admin,
			Token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
