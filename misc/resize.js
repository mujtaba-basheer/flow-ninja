window.addEventListener("load", () => {
  const topEl = document.querySelector("div.focus-image");
  const bottomEl = document.querySelector("img.web3-floor-image");
  const targetEl = document.querySelector("div.phone-animation-wrap");

  const setPosition = () => {
    const bottom =
      topEl.getBoundingClientRect().bottom -
      bottomEl.getBoundingClientRect().top -
      80;
    const top = topEl.clientHeight * 0.6735;

    targetEl.style.bottom = `${bottom}px`;
    targetEl.style.top = `${top}px`;
    targetEl.style.height = "auto";
  };

  setPosition();
  window.addEventListener("resize", setPosition);
});
