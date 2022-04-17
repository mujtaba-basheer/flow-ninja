window.addEventListener("load", () => {
  const targetEl = document.querySelector("div.section.empower");
  const images = targetEl.querySelectorAll("img");

  setTimeout(() => {
    images.forEach((image) => image.removeAttribute("loading"));
  }, 3000);
});
