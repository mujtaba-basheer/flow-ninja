window.addEventListener("load", () => {
  const nftl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  const numArrays = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
  ];

  const stickyTotalEl = document.querySelector("div.sticky-calculator-block");
  const groupEls = stickyTotalEl.querySelectorAll(
    "div.calculator-cell:not(:last-child)"
  );
  const groupTotalEl = document.getElementById("gr-full-total-side");
  const totalEl = document.getElementById("gr-full-total");

  // groupEls.forEach((groupEl, i) => {
  //   const numEl = groupEl.querySelector(`div#gr-${numArrays[i]}-total-side`);
  //   if (numEl) numEl.textContent = "$0";

  //   groupTotalEl.textContent = "$0";
  //   totalEl.textContent = "$0";
  // });

  const updateTotal = (): void => {
    let total = 0;
    for (let i = 0; i < groupEls.length; i++) {
      const groupEl = groupEls[i];
      const numEl = groupEl.querySelector(`div#gr-${numArrays[i]}-total-side`);
      if (numEl) {
        const num = Number(numEl.getAttribute("data-total") || 0);
        if (!isNaN(num)) total += num;
      }
    }

    groupTotalEl.textContent = nftl.format(total);
    totalEl.textContent = nftl.format(total);
  };
  const updateBlockTotal = (
    inputEls: NodeListOf<HTMLInputElement>,
    blockTotalEl: HTMLInputElement,
    sideTotalEl: Element
  ): void => {
    let blockTotal = 0;
    for (const inputEl of inputEls) {
      const val = inputEl.value;
      blockTotal += val ? Number(val.substring(1)) : 0;
    }

    blockTotalEl.value = nftl.format(blockTotal);
    sideTotalEl.textContent = nftl.format(blockTotal);
    sideTotalEl.setAttribute("data-total", `${blockTotal}`);

    updateTotal();
  };
  const updateExplore = (
    val: string,
    exploreBlockEl: HTMLElement,
    exploreEl: HTMLElement,
    i: number,
    j: number
  ) => {
    let fVal = "0";
    const href = exploreEl.getAttribute("data-href");

    if (val.length > 1) {
      val = `,${val.substring(1)}`;
      fVal = val.substring(1);

      exploreBlockEl.style.display = "block";
      exploreEl.style.display = "inline-block";
    } else {
      exploreEl.style.display = "none";
      const exploreEls = exploreBlockEl.querySelectorAll(
        "a div.price-wrap div:not(:first-child)"
      );
      let hide = true;
      for (const tempExploreEl of exploreEls) {
        if (tempExploreEl.textContent !== "0") {
          hide = false;
          break;
        }
      }
      if (hide) exploreBlockEl.style.display = "none";
    }
    exploreEl.setAttribute("href", href + val);

    const priceEl = document.getElementById(
      `gr-${numArrays[i]}-${numArrays[j]}-price`
    );
    if (priceEl) priceEl.textContent = fVal;
  };

  const exploreBlocks = document.querySelectorAll("div.explore-block");
  exploreBlocks.forEach((exploreBlock) => {
    const linkEls = exploreBlock.querySelectorAll("a");
    linkEls.forEach((linkEl) =>
      linkEl.setAttribute("data-href", linkEl.getAttribute("href"))
    );
  });

  const calcBlocks = document.querySelectorAll(
    "div.calculator-block:not(.bordered-block)"
  );
  calcBlocks.forEach((calcBlock, i) => {
    const blockTotalEl = calcBlock.querySelector<HTMLInputElement>(
      `input#gr-${numArrays[i]}-total`
    );
    const sideTotalEl = document.querySelector(
      `div#gr-${numArrays[i]}-total-side`
    );

    const inputEls = calcBlock.querySelectorAll<HTMLInputElement>(
      `input:not(#gr-${numArrays[i]}-total)`
    );
    const exploreBlockEl =
      calcBlock.querySelector<HTMLElement>("div.explore-block");

    inputEls.forEach((inputEl, j) => {
      const exploreEl = document.getElementById(
        `gr-${numArrays[i]}-${numArrays[j]}-link`
      );

      const defaultValue = inputEl.getAttribute("data-default");
      const val = defaultValue ? `$${defaultValue}` : "";
      inputEl.value = val;
      if (exploreEl) updateExplore(val, exploreBlockEl, exploreEl, i, j);

      inputEl.addEventListener("input", function (ev: InputEvent) {
        const { data, inputType } = ev;
        let rawVal = this.value.replace(/\s/g, "");
        let val = rawVal;

        if (inputType.startsWith("delete")) {
          if (!rawVal.includes("$")) val = "$" + rawVal;
          if (rawVal === "$") val = "";
        } else if (inputType.startsWith("insert")) {
          if (rawVal.length === 1 && !isNaN(Number(data)))
            rawVal = "$" + rawVal;

          if (isNaN(Number(data))) val = rawVal.replace(data, "");
          else val = rawVal;
        }

        this.value = val;

        updateBlockTotal(inputEls, blockTotalEl, sideTotalEl);

        if (exploreBlockEl && exploreEl)
          updateExplore(val, exploreBlockEl, exploreEl, i, j);
      });
    });

    updateBlockTotal(inputEls, blockTotalEl, sideTotalEl);
  });
});
