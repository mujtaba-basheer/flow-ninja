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
  // "item",
  "recent-reads",
];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `love-and-respect/${file}.js`,
        Body: fs.createReadStream(`love-and-respect/dist/${file}.js`),
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
    const inputCode = fs.readFileSync(`love-and-respect/js/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`love-and-respect/dist/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
    await returnPromise(file + ".min");
  })();
}
