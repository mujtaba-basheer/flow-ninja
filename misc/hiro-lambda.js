const https = require("https");

process.env.ACCESS_TOKEN =
  "4eba196c1d3f3ea6a98b9cca8abceb39c6cf4a1a5e015bdb71805b34586e4edf";

const handler = async () => {
  try {
    const blogsResp = callApi("62fa931f30aca6e5c270cd0b");
    const categoriesResp = callApi("62fa931f30aca62a7370cd3f");
    const typesResp = callApi("62fa931f30aca67ebf70cce4");

    const [blogs, categories, types] = await Promise.all([
      blogsResp,
      categoriesResp,
      typesResp,
    ]);

    let blogs_returned = blogs.count,
      total_blogs = blogs.total;
    while (blogs_returned < total_blogs) {
      const blogs_data = await callApi(
        "62fa931f30aca6e5c270cd0b",
        blogs_returned
      );
      blogs_returned += blogs_data.count;
      for (const item of blogs_data.items) {
        blogs.items.push(item);
      }
    }

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

    console.log(
      JSON.stringify({
        status: true,
        data: { categoryArr, typeArr },
      })
    );
  } catch (error) {
    console.error(error);
  }
};

const callApi = (cid, offset) => {
  return new Promise((res, rej) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${cid}/items?api_version=1.0.0&access_token=${
          process.env.ACCESS_TOKEN
        }${offset ? `&offset=${offset}` : ""}`,
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
