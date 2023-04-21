const credentials = {
  host: "https://insights.checkout.com",
  path: "/401",
  password: "testpass123",
  rs: "rRbpAtwSqKwKoSct",
};

exports.handler = async function (event, context, callback) {
  const host = event.headers.origin;
  try {
    const body = JSON.parse(event.body);
    console.log(event, event.headers.cookie);

    const { path, password } = body;
    const { code, rs } = checkPassword(host, path, password);
    let statusCode = 502,
      status = false,
      cookies = "";
    switch (code) {
      case 200: {
        statusCode = 200;
        status = true;
        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000).toUTCString();
        cookies = `wf_auth=${rs}; Expires=${expires}; HttpOnly; Secure; SameSite=None; Path=/; Domain=ui4tjdk9fh.execute-api.us-east-1.amazonaws.com`;
        break;
      }
      case 401: {
        statusCode = 401;
        status = false;
        break;
      }
      case 404: {
        statusCode = 404;
        status = false;
        break;
      }
    }

    callback(null, {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "https://insights.checkout.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
        "Set-Cookie": cookies,
      },
      body: JSON.stringify({
        status,
        msg: status ? "Auth succeeded" : "Something went wrong",
      }),
    });
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

const checkPassword = (host, path, password) => {
  if (credentials.host === host && credentials.path === path) {
    return credentials.password === password
      ? { code: 200, rs: credentials.rs }
      : { code: 401, rs: null };
  } else {
    return {
      code: 404,
      rs: null,
    };
  }
};
