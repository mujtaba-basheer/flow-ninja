document
  .querySelectorAll(".cms-item.recommended-episodes:not(:first-child)")
  .forEach((el) => {
    el.addEventListener("mouseover", () => {
      el.previousElementSibling.style["borderColor"] = "transparent";
    });

    el.addEventListener("mouseout", () => {
      el.previousElementSibling.style["borderColor"] = "#e8ecf0";
    });
  });
