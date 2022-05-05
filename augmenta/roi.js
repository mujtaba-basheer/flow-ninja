window.addEventListener("load", function () {
  const nftd = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "USD",
  });

  const roi_results = JSON.parse(sessionStorage.getItem("roi-results"));
  if (!roi_results) window.location.pathname = "";

  const params = { fertCost: "fert", yield: "yield", prodCost: "prod" };
  const years = ["first", "second", "third"];
  const variants = [
    { k: "WithAUG", v: "-w" },
    { k: "WithoutAUG", v: "-wo" },
  ];

  const yearEls = document.querySelectorAll("div.per-year");
  yearEls.forEach((yearEl, index) => {
    const year = years[index];
    Object.keys(params).forEach((key) => {
      for (const type of variants) {
        const amount = Number(roi_results[year][key + type["k"]]);
        try {
          yearEl.querySelector(`div.${params[key] + type["v"]}`).textContent =
            "$" + nftd.format(amount);
        } catch (error) {
          console.log(params[key] + type["v"]);
        }
      }
    });

    const yearlyProfit = Number(roi_results[year]["profitByAUG"]);
    yearEl.querySelector("div.yearly-profit").textContent =
      "$" + nftd.format(yearlyProfit);
  });

  const totalProfit = Number(roi_results["totalProfitByAUG"]);
  document.getElementById("total-profit").textContent =
    "$" + nftd.format(totalProfit);

  const { currency } = roi_results;
  document
    .querySelectorAll(".currency-span")
    .forEach((el) => (el.textContent = currency));
});
