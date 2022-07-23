"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const state = {
    data: [],
    filteredData: [],
    filters: {
        department: null,
        location: null,
    },
    cityMap: {
        Rangsdorf: {
            img: {
                id: "de",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd49415545af591_DE.svg",
            },
            country: "Germany",
        },
        Berlin: {
            img: {
                id: "de",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd49415545af591_DE.svg",
            },
            country: "Germany",
        },
        Paris: {
            img: {
                id: "fr",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd49494815af2b5_FR%20(1).png",
            },
            country: "France",
        },
        Madrid: {
            img: {
                id: "es",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd4945c645af2ca_ES.png",
            },
            country: "Spain",
        },
        Milan: {
            img: {
                id: "il",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd494c8ca5af29e_IT%20(1).png",
            },
            country: "Italy",
        },
        London: {
            img: {
                id: "gb",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd494d9f35af2ad_GB.png",
            },
            country: "Great Britain",
        },
        Warsaw: {
            img: {
                id: "pl",
                src: "https://assets-global.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd494cac75af2a5_PL%20(1).png",
            },
            country: "Great Britain",
        },
    },
};
const getXmlData = async () => {
    try {
        const request = await fetch("https://hive.jobs.personio.de/xml?language=en%20-%20English", { method: "GET" });
        const resp = (await request.text());
        return resp;
    }
    catch (error) {
        console.error(error);
    }
};
const getData = async () => {
    var e_1, _a;
    const xmlResp = await getXmlData();
    if (xmlResp) {
        const data = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlResp, "text/xml");
        const positionEls = doc.querySelectorAll("position");
        try {
            for (var positionEls_1 = __asyncValues(positionEls), positionEls_1_1; positionEls_1_1 = await positionEls_1.next(), !positionEls_1_1.done;) {
                const positionEl = positionEls_1_1.value;
                const attrEls = positionEl.children;
                const obj = {
                    id: "",
                    office: "",
                    recruitingCategory: "",
                    name: "",
                    jobDescriptions: [],
                    employmentType: "",
                    seniority: "",
                    schedule: "",
                    yearsOfExperience: "",
                    keywords: "",
                    occupation: "",
                    occupationCategory: "",
                    createdAt: "",
                };
                for (let i = 0; i < attrEls.length; i++) {
                    const itemEl = attrEls.item(i);
                    if (itemEl) {
                        const attrName = itemEl.nodeName;
                        const attrVal = itemEl.textContent;
                        if (attrName !== "jobDescriptions")
                            obj[attrName] = attrVal;
                        else {
                            const jdEls = itemEl.children;
                            for (let j = 0; j < jdEls.length; j++) {
                                const jdEl = jdEls.item(j);
                                const jdObj = {};
                                const jdAttrEls = jdEl === null || jdEl === void 0 ? void 0 : jdEl.children;
                                for (let k = 0; (jdAttrEls === null || jdAttrEls === void 0 ? void 0 : jdAttrEls.length) && k < (jdAttrEls === null || jdAttrEls === void 0 ? void 0 : jdAttrEls.length); k++) {
                                    const jdAttrEl = jdAttrEls.item(k);
                                    const aName = jdAttrEl === null || jdAttrEl === void 0 ? void 0 : jdAttrEl.nodeName;
                                    const aVal = jdAttrEl === null || jdAttrEl === void 0 ? void 0 : jdAttrEl.textContent;
                                    if (aName)
                                        jdObj[aName] = aVal;
                                }
                                obj.jobDescriptions.push(jdObj);
                            }
                        }
                    }
                }
                data.push(obj);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (positionEls_1_1 && !positionEls_1_1.done && (_a = positionEls_1.return)) await _a.call(positionEls_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return data;
    }
    return [];
};
const formatData = (positions) => {
    const data = [];
    const map = new Map();
    for (const position of positions) {
        const { recruitingCategory } = position;
        let index = map.get(recruitingCategory);
        if (index === undefined) {
            index = data.length;
            map.set(recruitingCategory, index);
            data.push({
                categoryName: recruitingCategory,
                positions: [],
            });
        }
        data[index].positions.push(position);
    }
    return data;
};
const switchEmptyState = (show) => {
    const el = document.getElementById("empty");
    if (show) {
        el.style.display = "flex";
    }
    else
        el.style.display = "none";
};
const populateData = () => {
    const data = formatData(state.filteredData);
    const mainWrapper = document.querySelector("div.container.grid:not(.careers-image-grid)");
    // remove all existing data
    mainWrapper === null || mainWrapper === void 0 ? void 0 : mainWrapper.querySelectorAll("div.careers-wrapper").forEach((x) => x.remove());
    data.forEach((x) => {
        const rootNode = document.createElement("div");
        rootNode.id = "w-node-c8647afd-a44c-bec1-a82f-55a92d3ae813-f95af213";
        rootNode.classList.add("careers-wrapper");
        const { categoryName, positions } = x;
        {
            const categoryEl = document.createElement("div");
            categoryEl.id = "w-node-_242208ff-f169-6f15-010d-4dbba0ca6a0c-f95af213";
            categoryEl.classList.add("column");
            {
                const catName = document.createElement("div");
                catName.classList.add("postition-category");
                catName.textContent = categoryName;
                const catDesc = document.createElement("div");
                catDesc.classList.add("postition-category-desc");
                catDesc.textContent = `Open positions in our ${categoryName.toLowerCase()} team.`;
                categoryEl.appendChild(catName);
                categoryEl.appendChild(catDesc);
            }
            const positionsRootEl = document.createElement("div");
            positionsRootEl.id =
                "w-node-_27f185ee-cb05-965e-f877-41960a6aee9b-f95af213";
            positionsRootEl.classList.add("positions-wrapper");
            for (const position of positions) {
                const positionEl = document.createElement("a");
                positionEl.href = `https://hive.jobs.personio.de/job/${position.id}`;
                positionEl.target = "__blank";
                positionEl.referrerPolicy = "no-referrer";
                positionEl.classList.add("postition-item");
                positionEl.classList.add("w-inline-block");
                {
                    const posDetailsEl = document.createElement("div");
                    posDetailsEl.id =
                        "w-node-_8b0ff74b-c42a-a480-f210-4ac8abafd68a-f95af213";
                    posDetailsEl.classList.add("column");
                    {
                        const posTitleEl = document.createElement("div");
                        posTitleEl.classList.add("postioin-title");
                        posTitleEl.textContent = position.name;
                        const posDescEl = document.createElement("div");
                        posDescEl.classList.add("postioin-desc");
                        posDescEl.textContent = `We’re looking for a ${position.seniority} ${position.name.toLowerCase()} to join our team.`;
                        const posInfoEl = document.createElement("div");
                        posInfoEl.classList.add("position-info-wrapper");
                        {
                            const infoItem1 = document.createElement("div");
                            infoItem1.classList.add("position-info-item");
                            {
                                const imgEl = document.createElement("img");
                                imgEl.classList.add("postition-status-icon");
                                imgEl.setAttribute("src", "https://assets.website-files.com/62b1ff3d1cd49478345af20c/62b1ff3d1cd4945bbd5af58f_Icon%20(4).svg");
                                imgEl.setAttribute("loading", "lazy");
                                const textEl = document.createElement("div");
                                const { schedule } = position;
                                textEl.textContent =
                                    schedule[0].toUpperCase() + schedule.substring(1);
                                infoItem1.appendChild(imgEl);
                                infoItem1.appendChild(textEl);
                            }
                            posInfoEl.appendChild(infoItem1);
                        }
                        posDetailsEl.appendChild(posTitleEl);
                        posDetailsEl.appendChild(posDescEl);
                        posDetailsEl.appendChild(posInfoEl);
                    }
                    const locationEl = document.createElement("div");
                    locationEl.id =
                        "w-node-_06e35210-ecf2-0675-dbbd-0c170ae51f83-f95af213";
                    locationEl.classList.add("location-pill");
                    const cityName = position.office.split(" ")[0];
                    const cityDetails = state.cityMap[cityName] || state.cityMap.Berlin;
                    {
                        const imgEl = document.createElement("img");
                        imgEl.id = cityDetails.img.id;
                        imgEl.classList.add("location-flag");
                        imgEl.setAttribute("src", cityDetails.img.src);
                        imgEl.setAttribute("loading", "lazy");
                        const textEl = document.createElement("div");
                        textEl.textContent = `${cityName}, ${cityDetails.country}`;
                        locationEl.appendChild(imgEl);
                        locationEl.appendChild(textEl);
                    }
                    positionEl.appendChild(posDetailsEl);
                    positionEl.appendChild(locationEl);
                }
                positionsRootEl.appendChild(positionEl);
            }
            rootNode.appendChild(categoryEl);
            rootNode.appendChild(positionsRootEl);
        }
        mainWrapper === null || mainWrapper === void 0 ? void 0 : mainWrapper.appendChild(rootNode);
    });
    switchEmptyState(data.length === 0);
};
const addFilters = () => {
    // adding location filters
    const locationFilterEl = document.getElementById("field-2");
    // removing existing data
    locationFilterEl.querySelectorAll("option").forEach((x) => x.remove());
    {
        const dOptionEl = document.createElement("option");
        dOptionEl.textContent = "See All Locations";
        dOptionEl.setAttribute("value", "");
        locationFilterEl.appendChild(dOptionEl);
        const cities = [];
        for (const position of state.data) {
            const { office } = position;
            const cityName = office.split(" ")[0];
            if (!cities.includes(cityName))
                cities.push(cityName);
        }
        cities.forEach((city) => {
            const optionEl = document.createElement("option");
            optionEl.textContent = city;
            optionEl.setAttribute("value", city);
            locationFilterEl.appendChild(optionEl);
        });
    }
    // adding department filters
    const data = formatData(state.data);
    const fieldFilterEl = document.getElementById("field");
    // removing existing data
    fieldFilterEl.querySelectorAll("option").forEach((x) => x.remove());
    {
        const dOptionEl = document.createElement("option");
        dOptionEl.textContent = "See All Departments";
        dOptionEl.setAttribute("value", "");
        fieldFilterEl.appendChild(dOptionEl);
        data.forEach((cat) => {
            const { categoryName } = cat;
            const optionEl = document.createElement("option");
            optionEl.textContent = categoryName;
            optionEl.setAttribute("value", categoryName);
            fieldFilterEl.appendChild(optionEl);
        });
    }
};
const applyFilters = () => {
    let filteredData = [...state.data];
    if (state.filters.department) {
        filteredData = filteredData.filter((position) => position.recruitingCategory === state.filters.department);
    }
    if (state.filters.location) {
        filteredData = filteredData.filter((position) => position.office.split(" ")[0] === state.filters.location);
    }
    state.filteredData = [...filteredData];
    populateData();
};
const handleFieldFilter = (ev) => {
    var _a;
    const value = (_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.value;
    if (value) {
        state.filters.department = value;
    }
    else {
        state.filters.department = null;
    }
    applyFilters();
};
const handleLocationFilter = (ev) => {
    var _a;
    const value = (_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.value;
    if (value) {
        state.filters.location = value;
    }
    else {
        state.filters.location = null;
    }
    applyFilters();
};
window.addEventListener("load", async () => {
    try {
        const positions = await getData();
        state.data = [...positions];
        state.filteredData = [...positions];
        populateData();
        addFilters();
    }
    catch (error) {
        console.error(error);
    }
    const fieldFilterEl = document.getElementById("field");
    fieldFilterEl.addEventListener("change", handleFieldFilter);
    const locationFilterEl = document.getElementById("field-2");
    locationFilterEl.addEventListener("change", handleLocationFilter);
});
