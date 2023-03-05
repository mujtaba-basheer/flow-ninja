window.addEventListener("load", () => {
  const listEl = document.querySelector("div.collection-list-integrations");
  if (listEl) {
    const itemEls = listEl.querySelectorAll("div.collection-item-integrations");
    itemEls.forEach((itemEl) => {
      const assetWrapperEl = itemEl.querySelector("div.asset-type-wrapper");
      if (assetWrapperEl) {
        const assetEl = assetWrapperEl.querySelector("div.asset-type-field");
        if (assetEl) {
          const assets = assetEl.textContent.trim().split(",");
          assetEl.remove();

          assets.forEach((asset) => {
            const assetEl = document.createElement("div");
            assetEl.className = "integration-asset-type asset-type-field";
            assetEl.setAttribute("fs-cmsfilter-field", "asset");
            assetEl.textContent = asset;

            assetWrapperEl.appendChild(assetEl);
          });
        }
      }
    });
  }
});
