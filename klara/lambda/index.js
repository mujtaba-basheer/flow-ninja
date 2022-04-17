const https = require("https");
const fs = require("fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

exports.handler = async function (event, context, callback) {
  const pdfData = JSON.parse(event.body);

  try {
    await writePdf(pdfData);
    const uploadData = await getPdfLink();

    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: true,
        data: uploadData,
      }),
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        status: false,
        message: "Oops, there was some error!\nPlease try later.",
      }),
    });
  }
};

const getPdfLink = () => {
  const fileKey = makeId(8);
  const params = {
    Body: fs.createReadStream("/tmp/test.pdf"),
    Bucket: "klara-roi-pdf",
    Key: fileKey + ".pdf",
    ContentType: "application/pdf",
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, {}, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};

const writePdf = (data) => {
  console.log("Payload:", data);
  const bodyData = JSON.stringify(data);

  const file = fs.createWriteStream("/tmp/test.pdf", "base64");
  const encodedToken = Buffer.from(process.env.API_KEY_PROD, "ascii").toString(
    "base64"
  );

  return new Promise((res, rej) => {
    const req = https.request(
      {
        hostname: "app.useanvil.com",
        path: "/api/v1/fill/j4BIxcUeFh3L1CDDvEYt.pdf",
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedToken}`,
          "Content-Type": "application/json",
          "Content-Length": bodyData.length,
        },
      },
      (resp) => {
        // resp.pipe(file);
        resp.on("data", (chunk) =>
          file.write(chunk, "binary", (err) => {
            if (err) {
              console.log("Error Writing File.Aborting...");
              file.close();
              resp.complete(null);
              rej(err);
            }
          })
        );

        resp.on("end", () => {
          console.log("Finished Writing File.");
          file.close();
          res(null);
        });

        resp.on("error", (err) => {
          file.close();
          rej(err);
        });
      }
    );

    req.write(bodyData);
    req.end();
  });
};

function makeId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
