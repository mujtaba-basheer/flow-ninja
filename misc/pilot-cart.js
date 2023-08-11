window.addEventListener("load", () => {
  const recommendedItemsContainer = document.querySelector(
    "div#default-recommended-cart div.w-dyn-items"
  );
  const cartItemsContainer = document.getElementById("cart_list");

  const onCartChange = (mutations) => {
    // getting cart items
    const cartItems = new Set();
    const cartItemEls = cartItemsContainer.querySelectorAll("div.cart_item");
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
          "div.description-column div.cart-text-wrapper > div"
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

      recommendedItemsContainer.style.display = flag ? "none" : "block";
    }
  };

  const observer = new MutationObserver(onCartChange);
  const options = {
    childList: true,
  };
  observer.observe(recommendedItemsContainer, options);
  observer.observe(cartItemsContainer, options);
  onCartChange();
});
