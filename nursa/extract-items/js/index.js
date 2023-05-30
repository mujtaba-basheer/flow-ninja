"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const fs = require("fs");
const utils_1 = require("./utils");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const init = async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    console.log("Browser launced!\n");
    // try {
    //   const starting_index: number = process.argv[2] ? +process.argv[2] : 1;
    //   const items: ItemT[] = [];
    //   for (let i = starting_index; i <= 92; i++) {
    //     const url = `https://sandbox-fn-nursa.webflow.io/jobs-testing-less-items-geolocation-custom-load?13e4b97b_page=${starting_index}`;
    //     await extractItems(browser, url, i, items);
    //   }
    //   await browser.close();
    //   writeItems(items);
    //   console.log("Done and done.");
    // } catch (error) {
    //   console.error(error);
    //   await browser.close();
    // }
    try {
        const starting_index = process.argv[2] ? +process.argv[2] : 1;
        const data = fs.createWriteStream("facilities.json", "utf8");
        data.write("[\n");
        for (let i = starting_index; i <= 182; i++) {
            const url = `https://sandbox-fn-nursa.webflow.io/jobs-testing-less-items-geolocation-custom-load?84b64659_page=${i}`;
            await (0, utils_1.extractFacilities)(browser, url, i, data);
        }
        data.write("\n]");
        data.close();
        await browser.close();
        // writeFacilities(items);
        console.log("Done and done.");
    }
    catch (error) {
        console.error(error);
        await browser.close();
    }
};
init();
