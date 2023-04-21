const credentials = {
  host: "https://insights.checkout.com",
  path: "/401",
  password: "testpass123",
  rs: "rRbpAtwSqKwKoSct",
};

exports.handler = async function (event, context, callback) {
  try {
    const cookie = event.headers.cookie;
    if (
      cookie &&
      cookie.startsWith("wf_auth=") &&
      cookie.split("=")[1] === credentials.rs
    ) {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://insights.checkout.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: true,
          msg: "Auth succeeded",
        }),
      });
    } else {
      callback(null, {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "https://insights.checkout.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: true,
          msg: "Auth failed",
        }),
      });
    }
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: error.code || error.data.code,
      headers: {
        "Access-Control-Allow-Origin": "https://insights.checkout.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        status: false,
        message: error.message || error.data.msg,
      }),
    });
  }
};

const checkPassword = (cookie) => {};
