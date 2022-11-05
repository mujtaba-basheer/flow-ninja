const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

const handler = async () => {
  try {
    const jobs = [];
    let path = "/spi/v3/jobs?limit=3";
    while (true) {
      const resp = await callApi(path);
      for (const job of resp.jobs) {
        jobs.push(job);
      }
      if (resp.paging && resp.paging.next) {
        path = resp.paging.next.substring(34);
      } else break;
    }
    // console.log(JSON.stringify(jobs));
  } catch (error) {
    console.error(error);
  }
};

const callApi = (path) => {
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        method: "GET",
        host: "gridcognition.workable.com",
        path,
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk.toString()));
        resp.on("end", async () => {
          try {
            data = JSON.parse(data);
            if (resp.statusCode === 200) resolve(data);
            else reject(data);
          } catch (error) {
            reject(error);
          }
        });
        resp.on("error", reject);
      }
    );
    request.end();
  });
};

handler();
