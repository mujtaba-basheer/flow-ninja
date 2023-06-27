window.addEventListener("load", () => {
  const recommendationWrapper = document.getElementById(
    "default-recommended-cart"
  );
  const recommendedItemsContainer = document.querySelector(
    "div#default-recommended-cart div.w-dyn-items"
  );
  const cartItemsContainer = document.getElementById("cart-list");

  const onCartChange = (mutations) => {
    // getting cart items
    const cartItems = new Set();
    const cartItemEls = cartItemsContainer.querySelectorAll("div.cart-item");
    cartItemEls.forEach((cartItemEl) => {
      const nameEl = cartItemEl.querySelector(
        ".w-commerce-commercecartproductname"
      );
      if (nameEl) {
        const productName = nameEl.textContent.trim();
        cartItems.add(productName);
      }
    });

    // iterating recommended items and removing those already in cart

    if (recommendedItemsContainer) {
      const recommendedItemEls =
        recommendedItemsContainer.querySelectorAll("div.w-dyn-item");
      let flag = true; // flag to specify if all recommended items have been removed
      let counter = 0,
        limit = 1;
      recommendedItemEls.forEach((recommendedItemEl) => {
        const nameEl = recommendedItemEl.querySelector(
          "div.cart-content-wrapper div > div > div"
        );
        if (nameEl) {
          const productName = nameEl.textContent.trim();
          if (cartItems.has(productName) || counter >= limit)
            recommendedItemEl.style.display = "none";
          else {
            recommendedItemEl.style.display = "block";
            flag = false;
            counter++;
          }
        }
      });

      recommendationWrapper.style.display = flag ? "none" : "block";
    }
  };

  const observer = new MutationObserver(onCartChange);
  const nodeOptions = {
    childList: true,
  };
  const recommendedOptions = {
    attributeFilter: ["style"],
  };
  observer.observe(cartItemsContainer, nodeOptions);
  observer.observe(recommendedItemsContainer, nodeOptions);
  recommendedItemsContainer
    .querySelectorAll("div.recommended-cart-item")
    .forEach((itemEl) => observer.observe(itemEl, recommendedOptions));
  onCartChange();
});
