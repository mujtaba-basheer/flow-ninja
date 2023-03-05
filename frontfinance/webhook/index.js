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

const getIntegrations = (integration) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "integration-api.getfront.com",
        path: `/api/v1/metadata/${integration || "getall"}`,
        method: "GET",
        headers: {
          "Accept-Version": "1.0.0",
          Accept: "application/json",
          "X-API-KEY": process.env.FF_API_KEY,
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

const addItemToCollection = (integrationData) => {
  const {
    assetTypes,
    info,
    name,
    logoUrl,
    status,
    accessCapabilities,
    supportedCryptocurrencySymbols,
    loginType,
    connectionType,
  } = integrationData;

  const integrationItem = {
    slug: name.replace(/\./g, "").toLowerCase().split(" ").join("-"),
    name,
    "asset-type-text-2": assetTypes.join(","),
    "short-description": info,
    "company-logo-alt-text": name,
    "company-logo": logoUrl,
    "status-text-2": status,
    "login-type-text-2": loginType,
    "connection-type-text-2": connectionType,
    "access-capabilities-text": accessCapabilities.join(","),
    "supported-cryptos-text-2": supportedCryptocurrencySymbols.join(","),
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
            console.log(`Added: ${integrationData.name}.`);
            resolve(JSON.parse(data));
          } else reject(JSON.parse(data));
        });

        response.on("error", (err) => {
          console.error(err);
          reject({ data: { msg: err.message, err: err.name, code: 500 } });
        });
      }
    );

    request.write(JSON.stringify({ fields: integrationItem }));
    request.end();
  });
};

const getCollectionSchema = () => {
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

const deleteCollectionItem = (id, title, sl) => {
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
            console.log(`${sl}. Item Deleted: ${title}`);
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

const handler = async () => {
  try {
    const resp = await getCollectionItems();
    console.log(JSON.stringify(resp));
    return;

    // delete all cms items
    const { items, count } = await getCollectionItems();
    console.log(`Total Items in CMS: ${count}`);
    let j = 0;
    for (const item of items) {
      const { _id, name } = item;
      await deleteCollectionItem(_id, name, ++j);
    }
    console.log("Deleted All CMS items");

    // fetching all data from the API
    const {
      content: { integrations },
    } = await getIntegrations();
    console.log(`Total Count: ${integrations.length}`);
    let i = 0;
    for (const integration of integrations) {
      console.log(`${++i}. ${integration.name}`);

      if (!integration.assetTypes) integration.assetTypes = [];

      try {
        const {
          content: { metadata },
        } = await getIntegrations(encodeURIComponent(integration.name));
        if (metadata.supportedCryptocurrencySymbols) {
          integration.supportedCryptocurrencySymbols =
            metadata.supportedCryptocurrencySymbols;
        } else {
          integration.supportedCryptocurrencySymbols = [];
        }

        if (metadata.accessCapabilities) {
          integration.accessCapabilities = metadata.accessCapabilities;
        } else {
          integration.accessCapabilities = [];
        }

        if (metadata.loginType) integration.loginType = metadata.loginType;
        else integration.loginType = "";
      } catch (error) {
        integration.supportedCryptocurrencySymbols = [];
        integration.accessCapabilities = [];
      }

      await addItemToCollection(integration);
    }
  } catch (error) {
    console.error(error);
  }
};

handler();
