import dotenv from 'dotenv';
import Stripe from 'stripe';
import * as Yup from 'yup';
dotenv.config();
('');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const caculateOrderAmount = (products) => {
	const total = products.reduce((acc, current) => {
		return current.price * current.quantity + acc;
	}, 0);

	return total;
};

class CreatePaymentIntentController {
	async store(request, response) {
		const schema = Yup.object({
			products: Yup.array()
				.required()
				.of(
					Yup.object({
						id: Yup.number().required(),
						quantity: Yup.number().required(),
						price: Yup.number().required(),
					}),
				),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(401).json({ error: err.errors });
		}
		const { products } = request.body;

		const amount = caculateOrderAmount(products);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'brl',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		response.json({
			clientSecret: paymentIntent.client_secret,
			dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
		});
	}
}

export default new CreatePaymentIntentController();
