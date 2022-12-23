"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fs = require("fs");
const minify = require("babel-minify");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const creds = new AWS.Credentials({
    accessKeyId: process.env.S3AccessKeyId,
    secretAccessKey: process.env.S3SecretAccessKey,
});
const S3 = new AWS.S3({ credentials: creds });
const filesToUpload = ["form"];
function returnPromise(file) {
    return new Promise((res, rej) => {
        S3.upload({
            Bucket: "flow-ninja-assets",
            Key: `ninja-script/${file}.js`,
            Body: fs.createReadStream(`ninja-script/${file}.js`),
            ContentType: "application/javascript",
            ACL: "public-read",
            CacheControl: "no-cache",
        }, (err, data) => {
            if (err)
                rej(err);
            else {
                console.log(`uploaded: ${file}.js\t ✅`);
                console.log(`link: ${data.Location}\n`);
                res(null);
            }
        });
    });
}
for (const file of filesToUpload) {
    (async () => {
        const inputCode = fs.readFileSync(`ninja-script/${file}.js`, {
            encoding: "utf8",
        });
        const outputCode = minify(inputCode, {}).code;
        const swiperCode = fs.readFileSync("ninja-script/swiper-code.txt", "utf8");
        fs.writeFileSync(`ninja-script/${file}.min.js`, swiperCode, {
            encoding: "utf8",
        });
        fs.appendFileSync(`ninja-script/${file}.min.js`, "\n\n" + outputCode, {
            encoding: "utf8",
        });
        await returnPromise(file + ".min");
    })();
}
