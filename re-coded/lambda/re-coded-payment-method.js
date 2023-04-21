const stripe = require("stripe").Stripe(process.env.STRIPE_SECRET);

const allowed_origins = ["https://re-coded.webflow.io", "https://re-coded.com"];

exports.handler = async function (event, context, callback) {
  const origin = event.headers["origin"];

  try {
    const body = JSON.parse(event.body);

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

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowed_origins.includes(origin)
          ? origin
          : allowed_origins[0],
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        data: paymentMethod,
      }),
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: error.code || error.data.code,
      headers: {
        "Access-Control-Allow-Origin": allowed_origins.includes(origin)
          ? origin
          : allowed_origins[0],
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        status: false,
        message: error.message || error.data.msg,
      }),
    });
  }
};
