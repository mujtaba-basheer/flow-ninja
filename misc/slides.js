const delay = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(null), time);
  });
};

const changeYear = async (curr, prev) => {
  if (curr.year === prev.year) return;

  const STEPS = 10;
  const factor = curr.year > prev.year;
  const diff = curr.year - prev.year;
  const stepDiff = diff / STEPS;
  let initVal = prev.year;

  curr.el.textContent = initVal;
  for (let i = 0; i < STEPS; i++) {
    await delay(100);
    initVal += factor ? Math.floor(stepDiff) : Math.ceil(stepDiff);
    curr.el.textContent = initVal;
  }
  curr.el.textContent = curr.year;
};

window.addEventListener("load", () => {
  const callback = (mutationList) => {
    const [{ target: slide1 }, { target: slide2 }] = mutationList;
    const [year1, year2] = [
      slide1.getAttribute("data-year"),
      slide2.getAttribute("data-year"),
    ];
    if (year1 || year2) {
      let currSlide, oldYear, newYear;
      if (slide1.classList.contains("w--tab-active")) {
        currSlide = slide1;
        newYear = year1 ? Number(year1) : 0;
        oldYear = year2 ? Number(year2) : 0;
      } else {
        currSlide = slide2;
        newYear = year2 ? Number(year2) : 0;
        oldYear = year1 ? Number(year1) : 0;
      }
      if (!currSlide.getAttribute("data-year")) return;
      console.log({ oldYear, newYear });

      const yearEl = currSlide.querySelector("h2.evolution-heading");
      changeYear({ year: newYear, el: yearEl }, { year: oldYear });
    }
  };
  const slideContainer = document.querySelector("div.story-tabs");
  const observer = new MutationObserver(callback);
  observer.observe(slideContainer, {
    subtree: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
  });
});
