const filters = {
  capacity: new Set(),
  deckType: new Set(),
  spreaderCapable: new Set(),
  deckLength: new Set(),
  gooseneck: new Set(),
  deckHeight: new Set(),
  trailerType: new Set(),
  suspension: new Set(),
};
const pageCategory = "compare-" + window.location.pathname.split("/")[2];

const lists = [
  {
    id: "capacity",
    filterId: "capacity",
    filterAttr: "capacity",
  },
  {
    id: "deck-type",
    filterId: "deckType",
    filterAttr: "deck-type",
  },
  {
    id: "spreader-capable",
    filterId: "spreaderCapable",
    filterAttr: "spreader",
  },
  {
    id: "deck-length",
    filterId: "deckLength",
    filterAttr: "deck-length",
  },
  {
    id: "gooseneck",
    filterId: "gooseneck",
    filterAttr: "gooseneck",
  },
  {
    id: "deck-height",
    filterId: "deckHeight",
    filterAttr: "deck-height",
  },
  {
    id: "trailer-type",
    filterId: "trailerType",
    filterAttr: "trailer",
  },
  {
    id: "suspension",
    filterId: "suspension",
    filterAttr: "suspension",
  },
];

const applyFilters = () => {
  const items = document.querySelectorAll(
    `div.${pageCategory} div.trailer-item.w-dyn-item`
  );
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    for (const listItem of lists) {
      const { filterId, filterAttr } = listItem;

      if (filters[filterId].size) {
        const value = item
          .querySelector(
            `div.dev-note .filter-option-target[fs-cmsfilter-field="${filterAttr}"]`
          )
          .textContent.toUpperCase()
          .trim();

        if (!filters[filterId].has(value)) {
          item.classList.add("hide");
          break;
        }
        item.classList.remove("hide");
      } else item.classList.remove("hide");
    }
  }

  document.getElementById("results-count").textContent =
    document.querySelectorAll(
      `div.${pageCategory} div.trailer-item.w-dyn-item:not(.hide)`
    ).length;
};

window.addEventListener("load", () => {
  const totalItems = document.querySelectorAll(
    `div.${pageCategory} div.trailer-item.w-dyn-item`
  ).length;
  document.getElementById("results-count").textContent = totalItems;
  document.getElementById("id-count").textContent = totalItems;

  document
    .querySelectorAll("div.w-condition-invisible")
    .forEach((x) => x.remove());

  for (const listItem of lists) {
    const { id, filterId } = listItem;
    const checkboxes = document.querySelectorAll(
      `nav.${id}-list input[type="checkbox"]`
    );
    for (const checkbox of checkboxes) {
      checkbox.checked = false;

      checkbox.addEventListener("change", () => {
        const text = checkbox.nextElementSibling.textContent
          .toUpperCase()
          .trim();
        if (checkbox.checked) filters[filterId].add(text);
        else filters[filterId].delete(text);

        applyFilters();
      });
    }
  }

  document.getElementById("reset-btn").addEventListener("click", () => {
    for (const listItem of lists) {
      const { id, filterId } = listItem;
      filters[filterId].clear();

      const checkboxes = document.querySelectorAll(
        `nav.${id}-list input[type="checkbox"]`
      );
      for (const checkbox of checkboxes) {
        checkbox.checked = false;
        checkbox.previousElementSibling.classList.remove(
          "w--redirected-checked"
        );
      }

      applyFilters();
    }
  });
});
