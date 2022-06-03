window.addEventListener("load", () => {
  const textBlocks = document.querySelectorAll("div.faq-item-toggle");
  textBlocks.forEach((textBlock) => {
    const toggleEl = textBlock.querySelector("div.read-more-toggle");
    toggleEl.addEventListener("click", () => {
      const { y } = textBlock.getBoundingClientRect();
      let topOffset = 139;
      if (window.innerWidth < 992) topOffset = 55;
      window.scrollBy({ top: y - topOffset, behavior: "smooth" });
    });
  });
});
