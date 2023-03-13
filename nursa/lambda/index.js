const dotenv = require("dotenv");

dotenv.config({ path: "nursa/.env" });
console.log(process.env.API_KEY);
