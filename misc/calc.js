window.addEventListener("load", () => {
  const formEl = document.getElementById("wf-form-Conversion-Form");
  const resultEl = document.querySelector("div.calculator-results-wrapper");
  const converstionRateSection = document.querySelector(
    ".conversion-rate-section"
  );
  const resetBtn = document.getElementById("reset-button");

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    const c = Number(formEl.querySelector("#conversion").value);
    const v = Number(formEl.querySelector("#Visit").value);
    const cp = ((c / v) * 100).toFixed(2);

    formEl.style.display = "none";
    resultEl.style.display = "block";
    converstionRateSection.style.display = "flex";
    resultEl.querySelector("span.conversion-result").textContent = cp;
  });

  resetBtn.addEventListener("click", () => {
    resultEl.style.display = "none";
    formEl.style.display = "block";
  });
});
