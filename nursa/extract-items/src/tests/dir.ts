import { mkdir } from "node:fs";

mkdir("a/b/c", { recursive: true }, (err) => {
  if (err) return console.error(err);
  console.log("Directory created!");
});
