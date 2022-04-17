const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv");
const minify = require("babel-minify");
dotenv.config();

const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId,
  secretAccessKey: process.env.S3SecretAccessKey,
});

const S3 = new AWS.S3({ credentials: creds });

const filesToUpload = [
  "index",
  // "module",
  // "mind",
  // "body",
  // "soul",
  // "contact",
];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `lead-qualifier/${file}.js`,
        Body: fs.createReadStream(`lead-qualifier/${file}.js`),
        ACL: "public-read",
        ContentType: "application/javascript",
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
};

(async () => {
  for (const file of filesToUpload) {
    const inputCode = fs.readFileSync(`lead-qualifier/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`lead-qualifier/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
  }
  const promises = filesToUpload.map((file) => returnPromise(file + ".min"));
  await Promise.all(promises);
})();
