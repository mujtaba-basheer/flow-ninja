/*

const searchState: SearchStateType = {
  items: [],
  inputEl: null,
  autoEl: null,
  numResults: null,
  searchValue: null,
};

const handleSearchInput = () => {
  const { items, inputEl, autoEl, numResults, searchValue } = searchState;
  if (inputEl && autoEl) {
    const value = inputEl.value;
    if (value) {
      $(".search-result-text").css("visibility", "visible");
      const result = items.find((x) => x.value.original.startsWith(value));
      if (result) {
        autoEl.textContent = result.value.original;
        if (result.value.original !== value) {
          autoEl.setAttribute("tabindex", "0");
        } else autoEl.removeAttribute("tabindex");
      } else {
        autoEl.textContent = "";
        autoEl.removeAttribute("tabindex");
      }

      const valueSlug = slugify(value);
      let n = 0;
      for (const item of items) {
        if (item.value.slug.includes(valueSlug)) {
          n++;
          item.element.classList.remove("search-item-out");
        } else {
          item.element.classList.add("search-item-out");
        }
      }

      if (numResults && searchValue) {
        numResults.textContent = `${n}`;
        searchValue.textContent = value;
      }
    } else {
      $(".search-result-text").css("visibility", "hidden");
      autoEl.textContent = "";
      autoEl.removeAttribute("tabindex");
      for (const item of items) {
        item.element.classList.remove("search-item-out");
      }
    }
  }
};

const handleSearchClear = () => {
  const { inputEl, autoEl, items } = searchState;
  if (inputEl && autoEl) {
    inputEl.value = "";
    autoEl.textContent = "";
    autoEl.removeAttribute("tabindex");

    items.forEach((item) => item.element.classList.remove("search-item-out"));
    $(".search-result-text").css("visibility", "hidden");
  }
};

const handleSearchFocus = () => {
  const { inputEl, autoEl } = searchState;
  if (inputEl && autoEl) {
    const autoText = autoEl.textContent;
    if (autoText) {
      inputEl.value = autoText;
      inputEl.focus({ preventScroll: true });
      handleSearchInput();
    }
  }
};
*/
window.addEventListener("load", () => {
    // const mainWrapper = document.querySelector<HTMLDivElement>("div.main-wrapper");
    // adding elements and values to state
    const itemEls = document.querySelectorAll("div.search-result-item");
    // for (const itemEl of itemEls) {
    //   const value =
    //     itemEl?.querySelector("a.search-link div")?.textContent?.trim() || "";
    //   searchState.items.push({
    //     element: itemEl,
    //     value: {
    //       original: value,
    //       slug: value.toLowerCase().split(" ").join("-"),
    //     },
    //   });
    // }
    const numResults = document.getElementById("number-of-searches");
    const searchValue = document.getElementById("search-querry");
    if (numResults && searchValue) {
        numResults.textContent = `${itemEls.length}`;
        const sp = new URLSearchParams(window.location.search);
        const query = sp.get("query");
        if (query) {
            searchValue.textContent = `${query}`;
        }
        else {
            $(".search-result-text").css("visibility", "hidden");
        }
    }
    // adding clear listener
    const clearEl = document.getElementById("clear-search");
    if (clearEl) {
        clearEl.addEventListener("click", () => {
            window.location.search = "";
        });
    }
    // const inputEl = mainWrapper?.querySelector(
    //   "input#search"
    // ) as HTMLInputElement;
    // if (inputEl) {
    // creating autocomplete element
    // const parentEl = inputEl.parentElement;
    // if (parentEl) {
    //   parentEl.style.position = "relative";
    //   const autoEl = document.createElement("div");
    //   autoEl.classList.add("autocomplete");
    //   autoEl.setAttribute("tabindex", "0");
    //   inputEl.after(autoEl);
    //   searchState.autoEl = autoEl;
    //   // handling tab focus
    //   autoEl.addEventListener("focus", handleSearchFocus);
    // }
    // adding event listener on input
    // inputEl.addEventListener("input", handleSearchInput);
    // adding submit listener on form
    // const formEl = mainWrapper?.querySelector<HTMLFormElement>("form.w-form");
    // if (formEl) {
    // formEl.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   const value = inputEl.value;
    //   window.location.href = `https://${
    //     window.location.hostname
    //   }/search?query=${encodeURIComponent(value)}`;
    // });
    // }
    // adding clear listener
    // const clearEl = document.getElementById("clear-search");
    // if (clearEl) {
    //   window.location.search = "";
    // }
    // extracting query and filtering
    // const sp = new URLSearchParams(window.location.search);
    // const query = sp.get("query");
    // if (query) {
    //   inputEl.value = query;
    //   handleSearchInput();
    // }
    // }
});
