const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    const body = req.body;
    console.log({ body });
    const { amount, email } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      // automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: { integration_check: "accept_a_payment" },
    });

    res.json({
      status: true,
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Some error...",
    });
  }
};

exports.createPaymentMethod = async (req, res) => {
  try {
    const body = req.body;
    const { cvc, exp_month, exp_year, number, email, name } = body;

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
      billing_details: {
        email,
        name,
      },
    });

    res.json({
      status: true,
      data: paymentMethod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: "Some error...",
    });
  }
};
