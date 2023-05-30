import gsap from "gsap";

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

gsap.registerPlugin(ScrollTrigger);

const blueCardEl = document.querySelector("div.blue-grid-guide");
const whiteBoxEl1 = document.querySelector(
  "div.load-number-bg.white-box.second"
);
const parentEl1 = whiteBoxEl1?.parentElement as HTMLDivElement;
const whiteBoxEl2 = document.querySelector(
  "div.load-number-bg.white-box.first"
);
const parentEl2 = whiteBoxEl2?.parentElement as HTMLDivElement;

const timeline = ScrollTrigger.create({});
