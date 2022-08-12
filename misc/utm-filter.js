window.addEventListener("load", () => {
  const query = window.location.search;
  if (query) {
    const params = new URLSearchParams(query);

    const klara_lp_keyword = params.get("klara-lp-keyword");
    if (klara_lp_keyword) {
      const items = document.querySelectorAll("div.klara-lp-keyword");
      for (const item of items) {
        if (item.textContent !== klara_lp_keyword) {
          item.parentElement.remove();
        }
      }

      const features = document.querySelectorAll(
        "div.klara-lp-feature-keyword"
      );
      const listEls = document.querySelectorAll("div.klara-lp-list");
      if (features.length === listEls.length) {
        for (let i = 0; i < listEls.length; i++) {
          const feature = features[i];
          const listEl = listEls[i];

          const labelText = feature.textContent;
          const labels = listEl.querySelectorAll("div.klara-lp-feature-label");
          for (const label of labels) {
            if (label.textContent !== labelText) {
              label.parentElement.remove();
            }
          }
        }
      }
    }
  }
});

window.addEventListener("load", () => {
  const query = window.location.search;
  if (query) {
    const params = new URLSearchParams(query);
    const sendinBlueForm = params.get("sendinBlueForm");
    if (sendinBlueForm === "visible") {
      $("<form-selector>").css("display", "block");
    }
  }
});
