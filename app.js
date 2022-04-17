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

const filesToUpload = ["index"];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "ahaan-static-files",
        Key: `simple-club/${file}.js`,
        Body: fs.createReadStream(`${file}.js`),
        ACL: "public-read",
        ContentType: "application/javascript",
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
  // (async () => {
  //   try {
  //     await returnPromise(file);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })();

  (async () => {
    const inputCode = fs.readFileSync(`${file}.js`, { encoding: "utf8" });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`${file}.min.js`, outputCode, { encoding: "utf8" });
    await returnPromise(file + ".min");
  })();
}
