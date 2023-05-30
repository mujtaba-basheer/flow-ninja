const gm = require("gm");
const path = require("path");
const fs = require("fs");

fs.readdir(
  path.resolve(process.cwd(), "bold", "images", "logos"),
  "utf8",
  (err, files) => {
    if (err) console.error(err);
    else {
      files.forEach((file) => {
        const pathToSvg = path.resolve(
          process.cwd(),
          "bold",
          "images",
          "logos",
          file
        );
        const pathToPng = path.resolve(
          process.cwd(),
          "bold",
          "images",
          "logos",
          file.replace("svg", "png")
        );
        console.log({ pathToSvg });
        gm(pathToSvg).write(pathToPng, (err) => {
          if (err) console.error(err);
          else console.log(`Converted: ${file}`);
        });
      });
    }
  }
);
