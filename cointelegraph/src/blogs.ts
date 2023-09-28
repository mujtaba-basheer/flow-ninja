window.addEventListener("load", async () => {
  try {
    const Wized = window.Wized;
    await Wized.request.execute("Get User Data");

    // fetching user wishlist items
    let wishlist_items: string[] = await Wized.data.get(
      "r.3.d.result_1.liked_wishlist_items"
    );
    if (!wishlist_items) wishlist_items = [];
    let token = await Wized.data.get("c.token");
    // iterating through CMS items
    const cmsItems = document.querySelectorAll(
      ".w-dyn-items .suggest-cms-item"
    );
    cmsItems.forEach((cmsItem) => {
      const buttonEl = cmsItem.querySelector(
        ".suggest-like-button-wrapper button"
      );
      if (buttonEl) {
        const svgEl = buttonEl.querySelector("svg");
        const numLikesEl = cmsItem.querySelector(
          `.suggest-like-button-wrapper div[wized="numOfLikes"]`
        );
        const slug = buttonEl.id;
        if (svgEl && numLikesEl) {
          if (wishlist_items.includes(slug)) svgEl.classList.add("clicked");

          buttonEl.addEventListener("click", async () => {
            try {
              let action = "like";
              // @ts-ignore
              const currLikes = +numLikesEl.textContent.trim();
              let num_of_likes = 1;
              if (!svgEl.classList.contains("clicked")) {
                action = "unlike";
                num_of_likes = -1;
              }
              numLikesEl.textContent = currLikes + num_of_likes + "";
              const body = {
                wishlist_item_id: slug,
                action,
                num_of_likes,
              };
              const req = await fetch(
                "https://xftf-jpdt-k3rz.n7c.xano.io/api:Mrj0XxDe/likes",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(body),
                }
              );
              const resp = await req.json();
              const { updated_likes } = resp;
              if (req.status !== 200) {
                svgEl.classList.toggle("clicked");
                numLikesEl.textContent = updated_likes - num_of_likes + "";
              }
            } catch (error) {
              console.error(error);
            }
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
});
