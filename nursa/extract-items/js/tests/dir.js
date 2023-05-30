"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
(0, node_fs_1.mkdir)("a/b/c", { recursive: true }, (err) => {
    if (err)
        return console.error(err);
    console.log("Directory created!");
});
