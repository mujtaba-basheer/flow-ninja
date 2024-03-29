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
  // "careers",
  // "open-positions",
  // "index",
  // "search",
  // "open-positions.v2",
  "careers.v2",
  // ""
];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `prodyna/${file}.js`,
        Body: fs.createReadStream(`prodyna/build/${file}.js`),
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

for (const file of filesToUpload) {
  (async () => {
    const inputCode = fs.readFileSync(`prodyna/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`prodyna/build/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
    await returnPromise(file + ".min");
  })();
}
