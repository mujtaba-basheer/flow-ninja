// const fetch = require("node-fetch");
const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

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

const getJobs = () => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "boards-api.greenhouse.io",
        path: `/v1/boards/${process.env.GREENHOUSE_BOARD_TOKEN}/jobs?content=true`,
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

const addItemToCollection = (jobData) => {
  let location = "";
  let department = "";
  if (jobData.location) {
    location = jobData.location.name;
    delete jobData.location;
  }
  if (jobData.departments) {
    if (jobData.departments.length > 0)
      department = jobData.departments?.[0]?.name;
    delete jobData.departments;
  }

  const jobItem = {
    slug: `${jobData.id}`,
    name: jobData.title,
    department,
    location,
    "url-absolute": jobData.absolute_url,
    // id: data.id,
    _archived: false,
    _draft: false,
  };

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${process.env.COLLECTION_ID}/items?live=true`,
        method: "POST",
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
          // console.log(data);
          if (response.statusCode === 200) {
            console.log(`Added: ${jobData.title}.`);
            resolve(JSON.parse(data));
          } else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.write(JSON.stringify({ fields: jobItem }));
    request.end();
  });
};

const getCollectionSchema = (data) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${process.env.COLLECTION_ID}`,
        method: "GET",
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
          console.log(data);
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

const deleteCollectionItems = (ids) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.webflow.com",
        path: `/collections/${process.env.COLLECTION_ID}/items`,
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
            console.log("Items Deleted!");
            resolve(JSON.parse(data));
          } else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    const body = {
      itemIds: ids,
    };
    console.log({ body });
    request.write(JSON.stringify(body));
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

const handler = async () => {
  try {
    const { items } = await getCollectionItems();
    for (const item of items) {
      const id = item.slug;
      const job = await getJobById(id);
      if (job === false) {
        await deleteCollectionItem(item._id, item.name);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

handler();
