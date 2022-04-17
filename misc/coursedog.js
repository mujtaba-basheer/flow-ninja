const https = require("https");

const allowed_origins = [
  "https://www.coursedog.com",
  "https://smartsuite-dev.webflow.io",
];

const capitalize = (str = "") => {
  return str[0].toUpperCase() + str.substring(1);
};

const main = async () => {
  try {
    const data = await callApi();
    const jobs = data.data.map((job) => {
      const { id, employment_type, title, url, department, location } = job;
      return {
        id,
        employment_type: employment_type.split("_").map(capitalize).join(" "),
        title,
        url,
        department: department.name,
        location: location.name,
      };
    });
    console.log(jobs);
  } catch (error) {
    console.error(error);
  }
};

exports.handler = async function (event, context, callback) {
  const origin = event.headers["origin"];

  try {
    const data = await callApi();
    const jobs = data.data.map((job) => {
      const { id, employment_type, title, url, department, location } = job;
      return {
        id,
        employment_type,
        title,
        url,
        department: department.name,
        location: location.name,
      };
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
        data: jobs,
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
        hostname: "coursedog.pinpointhq.com",
        path: "/jobs.json",
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

main();
