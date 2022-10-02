const state = {
  limit: 6,
  pageNo: 1,
};

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
const currentTab = "Construction";
const lists = [
  { id: "capacity", filterId: "capacity", filterAttr: "capacity" },
  { id: "deck-type", filterId: "deckType", filterAttr: "deck-type" },
  {
    id: "spreader-capable",
    filterId: "spreaderCapable",
    filterAttr: "spreader",
  },
  { id: "deck-length", filterId: "deckLength", filterAttr: "deck-length" },
  { id: "gooseneck", filterId: "gooseneck", filterAttr: "gooseneck" },
  { id: "deck-height", filterId: "deckHeight", filterAttr: "deck-height" },
  { id: "trailer-type", filterId: "trailerType", filterAttr: "trailer" },
  { id: "suspension", filterId: "suspension", filterAttr: "suspension" },
];

const applyFilters = () => {
  const currentTab = getCurrentTab();
  const items = currentTab.querySelectorAll(`div.trailer-item.w-dyn-item`);
  for (let b = 0; b < items.length; b++) {
    const item = items[b];
    for (const a of lists) {
      const { filterId, filterAttr } = a;
      if (filters[filterId].size) {
        const e = item.querySelector(
          `div.specifications .filter-option-target[fs-cmsfilter-field="${filterAttr}"]`
        );
        if (e) {
          const a = e.textContent.toUpperCase().trim();
          if (!filters[filterId].has(a)) {
            item.classList.add("hide");
            item.classList.remove("sel");
            break;
          }
          // item.classList.remove("hide");
          item.classList.add("sel");
        } else {
          {
            item.classList.add("hide");
            item.classList.remove("sel");
          }
        }
      } else {
        // item.classList.remove("hide");
        item.classList.add("sel");
      }
    }
  }

  state.pageNo = 1;
  applyPagination();
};

const applyPagination = () => {
  const currentTab = getCurrentTab();
  const { pageNo, limit } = state;
  const loadBtn = currentTab.querySelector(".button.load-more");
  loadBtn.classList.remove("hide");
  const selectedEl = currentTab.querySelectorAll(
    `div.trailer-item.w-dyn-item.sel`
  );
  const selectedNos = selectedEl.length;

  let f = (pageNo - 1) * limit;
  let r = f + (limit - 1);
  if (r + 1 >= selectedNos) {
    r = selectedNos - 1;
    loadBtn.classList.add("hide");
  }

  for (let i = 0; i < selectedNos; i++) {
    if (i <= r) selectedEl[i].classList.remove("hide");
    else selectedEl[i].classList.add("hide");
  }

  const [dispEl, totalEl] = currentTab.querySelectorAll(`span.results-count`);
  dispEl.textContent = currentTab.querySelectorAll(
    "div.trailer-item.w-dyn-item.sel:not(.hide)"
  ).length;
  totalEl.textContent = selectedEl.length;
};

const getCurrentTab = () =>
  document.querySelector(
    `div.w-tab-pane.w--tab-active[data-w-tab="${currentTab}"]`
  );

window.addEventListener("load", () => {
  const currentTabEl = getCurrentTab();
  const totalItems = currentTabEl.querySelectorAll(
    `div.trailer-item.w-dyn-item`
  ).length;
  const [dispEl, totalEl] = currentTabEl.querySelectorAll(`span.results-count`);
  dispEl.textContent = totalItems;
  totalEl.textContent = totalItems;

  for (const listItem of lists) {
    const { id, filterId } = listItem;
    const checkboxes = document.querySelectorAll(
      `nav.${id}-list input[type="checkbox"]`
    );
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
      checkbox.addEventListener("change", () => {
        const filterLabel = checkbox.nextElementSibling.textContent
          .toUpperCase()
          .trim();
        filters[filterId]?.[checkbox.checked ? "add" : "delete"](filterLabel);
        applyFilters();
      });
    }
  }

  const resetBtns = document.querySelectorAll(".reset-button");
  resetBtns.forEach((resetBtn) =>
    resetBtn.addEventListener("click", () => {
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
    })
  );

  const loadMoreBtns = document.querySelectorAll(".load-more");
  loadMoreBtns.forEach((loadMoreBtn) =>
    loadMoreBtn.addEventListener("click", () => {
      state.pageNo++;
      applyPagination();
    })
  );
  applyFilters();
});
