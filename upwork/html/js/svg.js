window.addEventListener("load", () => {
  const v = new Vivus("svg-path", {
    duration: 1000,
    type: "oneByOne",
  });

  const start = 0,
    stop = 1200;

  window.addEventListener("scroll", () => {
    const offset = window.pageYOffset;
    console.log(offset);

    if (offset >= start && offset <= stop) {
      const progress = (offset - start) / (stop - start);
      v.setFrameProgress(progress);
      v.stop();
    }
  });
});

/*

// code to append script
const s = document.createElement("script");
s.src = "//cdn.jsdelivr.net/npm/vivus@latest/dist/vivus.min.js";
document.body.appendChild(s);

// adding vivus instance
const v = new Vivus("my-svg", { duration: 10000, type: "oneByOne", });

// code to add scroll listener
window.addEventListener("scroll", () => {
  const offset = window.pageYOffset;

  const start = 420,
    stop = 3498;
  if (offset >= start && offset <= stop) {
    const progress = (offset - start) / (stop - start);
    v.setFrameProgress(progress);
    v.stop();
  }
});

*/
