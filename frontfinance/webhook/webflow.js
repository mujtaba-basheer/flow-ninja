const dotenv = require("dotenv");
dotenv.config();
const Webflow = require("webflow-api");

const webflow = new Webflow({
  token: process.env.WEBFLOW_API_KEY,
  version: "1.0.0",
  headers: {
    "User-Agent": "My Webflow App / 1.0",
  },
});

const main = async () => {
  try {
    const [site] = await webflow.sites();
    await site.publishSite(["https://www.getfront.com/integrations"]);
    console.log("Site Published!");
  } catch (err) {
    console.error(err);
  }
};

main();
