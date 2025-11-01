import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const create_payment_intent = async (req, res) => {
  try {
    const { amount, currency = "inr" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in fetch:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
