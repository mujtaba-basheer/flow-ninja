"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const GM = require("gm");
const data = fs.statSync("images/176/1.jpg");
console.log(data);
const imgPath = "images/173/1.jpg";
const gm = GM.subClass({ imageMagick: true });
gm(imgPath).size((err, val) => {
    if (err)
        console.error(err);
    else
        console.log(val);
});
