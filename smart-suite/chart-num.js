const wait = (time) =>
  new Promise((res) => {
    setTimeout(() => res(null), time);
  });
const numFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  style: "currency",
  currency: "USD",
});
const barValuesMap = {
  25: [312, 624, 936, 1248, 1560, 1872, 2184, 2496, 2808, 3120, 3432, 3744],
  50: [625, 1250, 1875, 2500, 3125, 3750, 4375, 5000, 5625, 6250, 6875, 7500],
  100: [
    1250, 2500, 3750, 5000, 6250, 7500, 8750, 10000, 11250, 12500, 13750, 15000,
  ],
};

const countdown = async (barEl) => {
  const numEl = barEl.querySelector("div.income-monthly");
  const finalVal = Number(numEl.getAttribute("data-val"));
  const inc = finalVal / 30;
  let c = 0;
  for (let i = 0; i <= 30 && c <= finalVal; i++) {
    numEl.textContent = numFormat.format(c);
    c += inc;
    await wait(30);
  }
  c -= inc;
  if (c < finalVal) {
    await wait(30);
    numEl.textContent = numFormat.format(finalVal);
  }
};

const countdownBanner = async (finalVal) => {
  const yearlyEl = document.getElementById("yearly-amount");
  const inc = finalVal / 30;
  let c = 0;
  for (let i = 0; i <= 30 && c <= finalVal; i++) {
    yearlyEl.textContent = numFormat.format(c);
    c += inc;
    await wait(30);
  }
  c -= inc;
  if (c < finalVal) {
    await wait(30);
    yearlyEl.textContent = numFormat.format(finalVal);
  }
};

window.addEventListener("load", () => {
  const chartEl = document.getElementById("income-calendar");
  const barEls = chartEl.querySelectorAll("div.income-bar-wrapper");
  const commissionEl = document.getElementById("income-calculator-ui");
  const commissionValues = commissionEl.querySelectorAll(".calculator-circle");

  commissionValues.forEach((commissionEl) => {
    const commissionValue = commissionEl
      .querySelector(".h5-style")
      .textContent.trim();
    commissionEl.addEventListener("click", () => {
      const barValues = barValuesMap[commissionValue];
      for (let i = 0; i < barEls.length; i++) {
        const barEl = barEls[i];
        countdownBanner(barValues[11]);
        const numEl = barEl.querySelector("div.income-monthly");
        const perMonth = barEl.querySelector("div.income-desc");
        numEl.setAttribute("data-val", String(barValues[i]));
        numEl.textContent = numFormat.format(barValues[i]);
        perMonth.textContent = `$${barValues[0]} per month`;
        if (i === 5 || i === 11) {
          countdown(barEl);
        }
      }
    });
  });

  // barEls.forEach((barEl) => {
  //   barEl.addEventListener("mouseover", () => countdown(barEl));
  // });
});
