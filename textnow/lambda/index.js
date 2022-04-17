const https = require("https");

exports.handler = async function (event, context, callback) {
  const body = JSON.parse(event.body);
  console.log(body);

  try {
    const { imei_no } = body;

    const resp = await checkDevice(imei_no);
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://textnow-dev.webflow.io",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        data: resp,
      }),
    });
    return;
  } catch (error) {
    console.error(error);

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://textnow-dev.webflow.io",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: false,
        data: error,
      }),
    });
    return;
  }
};

const checkDevice = (imei_no) => {
  return new Promise(function (res, rej) {
    const data = JSON.stringify({
      device_id: imei_no,
    });

    const req = https.request(
      {
        hostname: "www.stage.textnow.com",
        path: "/api/wireless/byod/v2/validate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (resp) => {
        const { statusCode } = resp;
        let data = "";

        resp.on("data", (chunk) => (data += chunk.toString()));
        resp.on("end", () => {
          if (statusCode === 200) res(JSON.parse(data));
          else rej(JSON.parse(data));
        });
        resp.on("error", (err) => rej(err));
      }
    );

    req.write(data);
    req.end();
  });
};
