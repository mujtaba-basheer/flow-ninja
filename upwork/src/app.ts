import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as minify from "babel-minify";
import { config } from "dotenv";

config();

const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId,
  secretAccessKey: process.env.S3SecretAccessKey,
});

const S3 = new AWS.S3({ credentials: creds });

const filesToUpload: string[] = ["calc"];

function returnPromise(file: string): Promise<null> {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "flow-ninja-assets",
        Key: `upwork/${file}.js`,
        Body: fs.createReadStream(`upwork/${file}.js`),
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
}

for (const file of filesToUpload) {
  (async () => {
    const inputCode = fs.readFileSync(`upwork/${file}.js`, {
      encoding: "utf8",
    });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`upwork/${file}.min.js`, outputCode, { encoding: "utf8" });
    await returnPromise(file + ".min");
  })();
}
