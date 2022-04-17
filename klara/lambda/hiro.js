const https = require("https");
require("dotenv").config({ path: "./klara/.env" });

const allowed_origins = [
  "*",
  "https://www.smartsuite.com",
  "https://smartsuite-dev.webflow.io",
];

const main = async () => {
  try {
    const blogsResp = callApi("623b5e723874a750aace2964");
    const categoriesResp = callApi("623b5e723874a70b7dce2966");
    const typesResp = callApi("624316ece87c4467f572efa9");

    const [blogs, categories, types] = await Promise.all([
      blogsResp,
      categoriesResp,
      typesResp,
    ]);

    const categorySet = {};
    const typeSet = {};

    for (const item of blogs.items) {
      const categories = item["category-2"] || [];
      for (const category of categories) {
        if (categorySet[category]) {
          categorySet[category]++;
        } else categorySet[category] = 1;
      }

      const type = item["type-2"];
      if (type) {
        if (typeSet[type]) {
          typeSet[type]++;
        } else typeSet[type] = 1;
      }
    }

    const categoryArr = [];
    for (const cid of Object.keys(categorySet)) {
      const category = categories.items.find(({ _id }) => _id === cid);
      if (category) {
        categoryArr.push({
          name: category.name,
          slug: category.slug,
          count: categorySet[cid],
        });
      }
    }

    const typeArr = [];
    for (const tid of Object.keys(typeSet)) {
      const type = types.items.find(({ _id }) => _id === tid);
      if (type) {
        typeArr.push({
          name: type.name,
          slug: type.slug,
          count: typeSet[tid],
        });
      }
    }

    console.log(JSON.stringify({ categoryArr, typeArr }));
  } catch (error) {
    console.error(error);
  }
};

exports.handler = async function (event, context, callback) {
  const origin = event.headers["origin"];

  try {
    const blogsResp = callApi("623b5e723874a750aace2964");
    const categoriesResp = callApi("623b5e723874a70b7dce2966");
    const typesResp = callApi("624316ece87c4467f572efa9");

    const [blogs, categories, types] = await Promise.all([
      blogsResp,
      categoriesResp,
      typesResp,
    ]);

    const categorySet = {};

    for (const item of blogs.items) {
      const categories = item["category-2"] || [];
      for (const category of categories) {
        if (categorySet[category]) {
          categorySet[category] = categorySet[category] + 1;
        } else categorySet[category] = 1;
      }
    }

    const arr = [];
    for (const cid of Object.keys(categorySet)) {
      const category = categories.items.find(({ _id }) => _id === cid);
      if (category) {
        arr.push({
          name: category.name,
          slug: category.slug,
          count: categorySet[cid],
        });
      }
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

const callApi = (cid) => {
  return new Promise((res, rej) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${cid}/items?api_version=1.0.0&access_token=${process.env.ACCESS_TOKEN}`,
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
