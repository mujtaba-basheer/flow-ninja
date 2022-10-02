const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), time);
  });
};

const run = async (mutationList) => {
  console.log(mutationList);
  const animationTime = 1000;
  const steps = 50;
  const stepDuration = animationTime / steps;
  const els = document.querySelectorAll(
    ".retailer-2 .info-block.lower-block .info-heading"
  );

  const animate = (el) => {
    return new Promise(async (res) => {
      const finalVal = el.getAttribute("data-value")
        ? Number(el.getAttribute("data-value"))
        : 500;
      const increment = finalVal / steps;
      let current = 0;
      for (let j = 0; j < steps; j++) {
        current = Math.floor(j * increment);
        el.textContent = current;
        await delay(stepDuration);
      }
      if (current < finalVal) {
        el.textContent = finalVal + "";
      }
      res(null);
    });
  };

  const animations = [];
  for (let i = 0; i < els.length; i++) {
    animations.push(animate(els[i]));
  }

  await Promise.all(animations);
};

window.addEventListener("load", async () => {
  const targetEl = document.querySelector(".section.retailer-2");
  const callback = (mutationList) => {
    const { oldValue } = mutationList[0];
    if (oldValue === "display: none;") {
      run();
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetEl, {
    subtree: false,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });
  if (targetEl.style.display === "flex") run();
});
