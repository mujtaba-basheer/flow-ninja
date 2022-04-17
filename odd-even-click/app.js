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

const filesToUpload = ["style"];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "ahaan-static-files",
        Key: `odd-even-click/${file}.css`,
        Body: fs.createReadStream(`odd-even-click/${file}.css`),
        ACL: "public-read",
        // ContentType: "application/javascript",
        ContentType: "text/css",
      },
      (err, data) => {
        if (err) rej(err);
        else {
          console.log(`uploaded: ${file}.css\t ✅`);
          console.log(`link: ${data.Location}\n`);
          res(null);
        }
      }
    );
  });
};

// for (const file of filesToUpload) {
//   (async () => {
//     const inputCode = fs.readFileSync(`odd-even-clicks/${file}.js`, {
//       encoding: "utf8",
//     });
//     const outputCode = minify(inputCode, {}).code;
//     fs.writeFileSync(`odd-even-clicks/${file}.min.js`, outputCode, {
//       encoding: "utf8",
//     });
//     await returnPromise(file + ".min");
//   })();
// }
for (const file of filesToUpload) {
  (async () => {
    await returnPromise(file);
  })();
}
