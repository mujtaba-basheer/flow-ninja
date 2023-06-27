const blueCardEl = document.querySelector("div.blue-grid-guide");
const whiteBoxEl1 = document.querySelector("div.load-number-bg.white-box.second");
const whiteBoxEl2 = document.querySelector("div.load-number-bg.white-box.first");
if (blueCardEl) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
let factor = 0.01, runCount = 0, lastPos = 0, hit = false;
const onWheel = async (ev) => {
    var _a, _b;
    const currentEl = runCount === 0 ? whiteBoxEl1 : whiteBoxEl2;
    const inc = factor * ev.deltaY;
    if (currentEl && whiteBoxEl1 && whiteBoxEl2) {
        const currentHeight = +currentEl.style.height.replace("%", "");
        if (currentHeight <= (runCount === 0 ? 44 : 90))
            currentEl.style.height = `${currentHeight + inc}%`;
        else {
            switch (runCount) {
                case 0: {
                    runCount = 1;
                    (_a = whiteBoxEl1.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("additional-second");
                    (_b = whiteBoxEl2.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("additional-first");
                    break;
                }
                case 1: {
                    runCount = 2;
                    whiteBoxEl2.classList.add("full");
                    // window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("wheel", onWheel);
                    document.body.style.overflow = "";
                    if (blueCardEl) {
                        blueCardEl.style.position = "relative";
                        blueCardEl.style.top = "auto";
                    }
                    // @ts-ignore
                    animations();
                    break;
                }
            }
        }
    }
};
if (blueCardEl) {
    window.addEventListener("wheel", onWheel);
}
// const onScroll = async () => {
//   if (blueCardEl) {
//     const top = blueCardEl.getBoundingClientRect().top;
//     // if (top < 160) {
//     if (top < 260) {
//       document.body.style.overflow = "hidden";
//       document.body.style.height = "100%";
//       window.removeEventListener("scroll", onScroll);
//       window.addEventListener("wheel", onWheel);
//     }
//   }
// };
// window.addEventListener("scroll", onScroll);