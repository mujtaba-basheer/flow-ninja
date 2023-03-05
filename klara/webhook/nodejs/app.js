const https = require("https");

exports.handler = async function (event, context, callback) {
  try {
    const { items } = await getCollectionItems();
    for (const item of items) {
      const id = item.slug;
      const job = await getJobById(id);
      if (job === false) {
        await deleteCollectionItem(item._id, item.name);
      }
    }

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        msg: "Function ran successfully.",
      }),
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        status: false,
        error,
      }),
    });
  }
};

const getCollectionItems = () => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${process.env.COLLECTION_ID}/items`,
        method: "GET",
        headers: {
          "Accept-Version": "1.0.0",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
        },
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => (data += chunk.toString()));

        response.on("end", () => {
          // console.log(data);
          if (response.statusCode === 200) resolve(JSON.parse(data));
          else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.end();
  });
};

const getJobById = (id) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "boards-api.greenhouse.io",
        path: `/v1/boards/${process.env.GREENHOUSE_BOARD_TOKEN}/jobs/${id}`,
        method: "GET",
        headers: {
          "Accept-Version": "1.0.0",
          Accept: "application/json",
          // Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
        },
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => (data += chunk.toString()));

        response.on("end", () => {
          // console.log(response.statusCode);
          if (response.statusCode === 404) resolve(false);
          else if (response.statusCode === 200) resolve(JSON.parse(data));
          else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.end();
  });
};

const deleteCollectionItem = (id, title) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${process.env.COLLECTION_ID}/items/${id}`,
        method: "DELETE",
        headers: {
          "Accept-Version": "1.0.0",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.WEBFLOW_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => (data += chunk.toString()));

        response.on("end", () => {
          if (response.statusCode === 200) {
            console.log(`Item Deleted: ${title}`);
            resolve(JSON.parse(data));
          } else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.end();
  });
};
