window.addEventListener("load", () => {
  let breakpoint = 500;

  const podcastItems = document.querySelectorAll(
    "div.podcast-featured-slide img.thumbnail-image"
  );
  podcastItems.forEach((currItem) => {
    currItem.addEventListener("click", () => {
      podcastItems.forEach((podcastItem) => {
        if (window.innerWidth >= breakpoint) {
          if (
            !podcastItem.isEqualNode(currItem) &&
            podcastItem.parentElement.parentElement.style.width === "820px"
          ) {
            podcastItem.click();
            setTimeout(() => {
              podcastItem.style.display = "inline-block";
            }, 350);
          }
        } else {
          if (
            !podcastItem.isEqualNode(currItem) &&
            podcastItem.parentElement.parentElement.style.width === "272px"
          ) {
            podcastItem.click();
            setTimeout(() => {
              podcastItem.style.display = "inline-block";
            }, 350);
          }
        }
      });
    });
  });
});
