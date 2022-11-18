"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId,
  secretAccessKey: process.env.S3SecretAccessKey,
});
const S3 = new AWS.S3({ credentials: creds });
const filesToUpload = ["index", "about", "careers", "contact"];
function returnPromise(file) {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `neopix/${file}.html`,
        Body: fs.createReadStream(`neopix/${file}.html`),
        ContentType: "text/html",
        ACL: "public-read",
        CacheControl: "no-cache",
      },
      (err, data) => {
        if (err) rej(err);
        else {
          console.log(`uploaded: ${file}.js\t ✅`);
          console.log(`link: ${data.Location}\n`);
          res(null);
        }
      }
    );
  });
}
for (const file of filesToUpload) {
  (async () => {
    await returnPromise(file);
  })();
}
