"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://lichtmiete.de/");
    await page.screenshot({ path: "./example.png" });
};
main();
