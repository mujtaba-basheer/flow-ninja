"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFacilities = exports.writeItems = exports.extractFacilities = exports.extractItems = void 0;
const dotenv_1 = require("dotenv");
const fs = require("fs");
(0, dotenv_1.config)();
const extractItems = async (browser, url, pageNo, items) => {
    try {
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "networkidle0",
        });
        console.log("on page:", pageNo);
        const itemEls = await page.$$("div#jobs-list > div.w-dyn-item");
        console.log(`Found ${itemEls.length} items.\n`);
        for (const itemEl of itemEls) {
            const item = {
                title: "",
                city: "",
                facility: "",
                state: "",
            };
            const titleEl = await itemEl.$(`div[fs-cmsfilter-field="Name"]`);
            if (titleEl) {
                const titleHandle = await titleEl.getProperty("textContent");
                const title = await titleHandle.jsonValue();
                if (title)
                    item.title = title;
            }
            const cityEl = await itemEl.$(`div[fn-filter-target="city"]`);
            if (cityEl) {
                const cityHandle = await cityEl.getProperty("textContent");
                const city = await cityHandle.jsonValue();
                if (city)
                    item.city = city;
            }
            const stateEl = await itemEl.$(`div[fn-filter-target="state"]`);
            if (stateEl) {
                const stateHandle = await stateEl.getProperty("textContent");
                const state = await stateHandle.jsonValue();
                if (state)
                    item.state = state;
            }
            const facilityEl = await itemEl.$(`div[fn-filter-target="facility"]`);
            if (facilityEl) {
                const facilityHandle = await facilityEl.getProperty("textContent");
                const facility = await facilityHandle.jsonValue();
                if (facility)
                    item.facility = facility;
            }
            items.push(item);
        }
        await page.close();
    }
    catch (error) {
        console.error(error);
    }
};
exports.extractItems = extractItems;
const extractFacilities = async (browser, url, pageNo, stream) => {
    try {
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: "networkidle0",
        });
        console.log("on page:", pageNo);
        const itemEls = await page.$$("div#facilities-list > div.w-dyn-item");
        console.log(`Found ${itemEls.length} items.\n`);
        for (const itemEl of itemEls) {
            const item = {
                name: "",
                city: "",
                state: "",
                latitude: 0,
                longitude: 0,
            };
            const nameEl = await itemEl.$(`span[fs-cmsfilter-field="Facility"]`);
            if (nameEl) {
                const nameHandle = await nameEl.getProperty("textContent");
                const name = await nameHandle.jsonValue();
                if (name)
                    item.name = name;
            }
            const cityEl = await itemEl.$(`div[fn-filter-target="city"]`);
            if (cityEl) {
                const cityHandle = await cityEl.getProperty("textContent");
                const city = await cityHandle.jsonValue();
                if (city)
                    item.city = city;
            }
            const stateEl = await itemEl.$(`div[fn-filter-target="state"]`);
            if (stateEl) {
                const stateHandle = await stateEl.getProperty("textContent");
                const state = await stateHandle.jsonValue();
                if (state)
                    item.state = state;
            }
            const latitudeEl = await itemEl.$(`div[class="latitude"]`);
            if (latitudeEl) {
                const latitudeHandle = await latitudeEl.getProperty("textContent");
                const latitude = await latitudeHandle.jsonValue();
                console.log({ latitude });
                if (latitude)
                    item.latitude = +latitude;
            }
            const longitudeEl = await itemEl.$(`div[class="longitude"]`);
            if (longitudeEl) {
                const longitudeHandle = await longitudeEl.getProperty("textContent");
                const longitude = await longitudeHandle.jsonValue();
                console.log({ longitude });
                if (longitude)
                    item.longitude = +longitude;
            }
            stream.write(JSON.stringify(item, null, "  ") + ",");
        }
        await page.close();
    }
    catch (error) {
        console.error(error);
    }
};
exports.extractFacilities = extractFacilities;
const writeItems = (items) => {
    fs.writeFileSync("data.json", JSON.stringify(items, null, "  "), "utf8");
};
exports.writeItems = writeItems;
const writeFacilities = (items) => {
    fs.writeFileSync("facilities.json", JSON.stringify(items, null, "  "), "utf8");
};
exports.writeFacilities = writeFacilities;
