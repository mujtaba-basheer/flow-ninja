const https = require("https");

const allowed_origins = [
  "*",
  "https://www.smartsuite.com",
  "https://smartsuite-dev.webflow.io",
];

process.env.ACCESS_TOKEN =
  "4eba196c1d3f3ea6a98b9cca8abceb39c6cf4a1a5e015bdb71805b34586e4edf";

const handler = async function (event, context, callback) {
  try {
    const blogsResp = callApi(
      "62b3510ffb9f156cdce98e14" || "62b3510ffb9f157af2e98e0b"
    );
    const categoriesResp = callApi("62b3510ffb9f157af2e98e0b");
    const typesResp = callApi("62b3510ffb9f1568d9e98e1c");

    const [blogs, categories, types] = await Promise.all([
      blogsResp,
      categoriesResp,
      typesResp,
    ]);

    // console.log(JSON.stringify({ blogs, categories, types }));

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
      // console.log({ type });
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

    console.log(
      JSON.stringify({
        status: true,
        data: { categoryArr, typeArr },
      })
    );
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

handler();
