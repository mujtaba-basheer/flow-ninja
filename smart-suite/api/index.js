const https = require("https");

const allowed_origins = [
  "https://www.smartsuite.com",
  "https://smartsuite-dev.webflow.io",
];

exports.handler = async function (event, context, callback) {
  const origin = event.headers["origin"];

  try {
    const data = await callApi();
    const { items } = data;
    const arr = [];

    for (const item of items) {
      const { slug, name, "solutions-real": sr } = item;
      if (sr) arr.push({ name, slug, count: sr.length });
    }

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
        data: arr,
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

const callApi = () => {
  return new Promise((res, rej) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/61826600956c6aacbb83d927/items?api_version=1.0.0&access_token=${process.env.ACCESS_TOKEN}`,
        method: "GET",
      },
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => (data += chunk.toString()));

        resp.on("end", () => {
          if (resp.statusCode === 200) res(JSON.parse(data));
          else rej(JSON.parse(data));
        });

        resp.on("error", (err) => {
          console.error(err);
          rej({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.end();
  });
};
