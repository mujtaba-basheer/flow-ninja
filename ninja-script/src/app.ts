import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as minify from "babel-minify";
import { config } from "dotenv";

config();

const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId as string,
  secretAccessKey: process.env.S3SecretAccessKey as string,
});

const S3 = new AWS.S3({ credentials: creds });

const filesToUpload: string[] = ["form"];

function returnPromise(file: string): Promise<null> {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",

        Key: `ninja-script/${file}.js`,
        Body: fs.createReadStream(`ninja-script/${file}.js`),
        ContentType: "application/javascript",

        // Key: `ninja-script/${file}.html`,
        // Body: fs.createReadStream(`ninja-script/html/${file}.html`),
        // ContentType: "text/html",

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
    const inputCode = fs.readFileSync(`ninja-script/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`ninja-script/${file}.min.js`, outputCode, {
      encoding: "utf8",
    });
    await returnPromise(file + ".min");
  })();
  // (async () => {
  //   await returnPromise(file);
  // })();
}
