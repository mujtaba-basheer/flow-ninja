const videoContainerEls = document.querySelectorAll(
  ".w-layout-grid.grid-44 > div"
);
videoContainerEls.forEach((videoContainerEl) => {
  const playBtn = videoContainerEl.querySelector(".image-646");
  const videoEl = videoContainerEl.querySelector("video");

  playBtn.addEventListener("click", () => videoEl.play());
});

const heroPlayBtn = document.querySelector(".hero-play-btn");
const heroVideoEl = document.querySelector("video.hero-vid");

heroPlayBtn.addEventListener("click", () => heroVideoEl.play());
