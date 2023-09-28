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
  // "registration",
  // "careers",
  "careers.v2",
  // "payment-method",
  // "global",
  // "mission",
  // ""
];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `checkout/${file}.js`,
        Body: fs.createReadStream(`checkout/dist/${file}.js`),
        ACL: "public-read",
        ContentType: "application/javascript",
        CacheControl: "no-cache",
      },
      (err, data) => {
        if (err) rej(err);
        else {
          console.log(`uploaded: ${file}.js\t`);
          console.log(`link: ${data.Location}\n`);
          res(null);
        }
      }
    );
  });
};

for (const file of filesToUpload) {
  (async () => {
    const inputCode = fs.readFileSync(`checkout/js/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`checkout/dist/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
    await returnPromise(file + ".min");
  })();
}
