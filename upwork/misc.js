window.scrollTo(0, 0);
window.addEventListener("load", function () {
  window.scrollTo({
    top: 0,
    left: 0,
  });
});

if (window.innerWidth > 991) {
  setTimeout(function () {
    window.scrollTo(0, 0);
    const blueCardEl = document.querySelector("div.blue-grid-guide");
    const whiteBoxEl1 = document.querySelector(
      "div.load-number-bg.white-box.second"
    );
    const whiteBoxEl2 = document.querySelector(
      "div.load-number-bg.white-box.first"
    );
    if (blueCardEl) {
      blueCardEl.style.position = "sticky";
      blueCardEl.style.top = "152px";
    }
    let factor = 0.09,
      runCount = 0;
    const onWheel = async (ev) => {
      var _a, _b;
      console.log("inside function: onWheel");
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
              (_a = whiteBoxEl1.parentElement) === null || _a === void 0
                ? void 0
                : _a.classList.add("additional-second");
              (_b = whiteBoxEl2.parentElement) === null || _b === void 0
                ? void 0
                : _b.classList.add("additional-first");
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
    const onScroll = async () => {
      console.log("inside function: onScroll");
      if (blueCardEl) {
        const top = blueCardEl.getBoundingClientRect().top;
        if (top < 160) {
          document.body.style.overflow = "hidden";
          window.removeEventListener("scroll", onScroll);
          window.addEventListener("wheel", onWheel);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
  }, 1000);
}
