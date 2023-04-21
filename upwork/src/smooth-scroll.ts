const blueCardEl = document.querySelector<HTMLDivElement>(
  "div.blue-grid-guide"
);
const whiteBoxEl1 = document.querySelector<HTMLDivElement>(
  "div.load-number-bg.white-box.second"
);
const whiteBoxEl2 = document.querySelector<HTMLDivElement>(
  "div.load-number-bg.white-box.first"
);
if (blueCardEl) {
  blueCardEl.style.position = "sticky";
  blueCardEl.style.top = "152px";
}
let factor = 0.01,
  runCount = 0;

const onWheel = async (ev: WheelEvent) => {
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
          whiteBoxEl1.parentElement?.classList.add("additional-second");
          whiteBoxEl2.parentElement?.classList.add("additional-first");
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
