"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = require("gsap");
{
    const gsapScript = document.createElement("script");
    gsapScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js";
    const scrollScript = document.createElement("script");
    scrollScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/ScrollTrigger/1.0.6/ScrollTrigger.min.js";
    document.body.appendChild(gsapScript);
    document.body.appendChild(scrollScript);
}
gsap_1.default.registerPlugin(ScrollTrigger);
const blueCardEl = document.querySelector("div.blue-grid-guide");
const whiteBoxEl1 = document.querySelector("div.load-number-bg.white-box.second");
const parentEl1 = whiteBoxEl1 === null || whiteBoxEl1 === void 0 ? void 0 : whiteBoxEl1.parentElement;
const whiteBoxEl2 = document.querySelector("div.load-number-bg.white-box.first");
const parentEl2 = whiteBoxEl2 === null || whiteBoxEl2 === void 0 ? void 0 : whiteBoxEl2.parentElement;
const timeline = ScrollTrigger.create({});
