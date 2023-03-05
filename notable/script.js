function swiper() {
  if (
    document.querySelector(".swiper-slide.podcast-featured-slide.open") &&
    document.querySelector(".swiper-slide.podcast-featured-slide.open")
      .firstChild.firstChild.nextSibling !== item
  ) {
    document
      .querySelector(".swiper-slide.podcast-featured-slide.open")
      .firstChild.firstChild.nextSibling.classList.toggle("smaller");
    document
      .querySelector(".swiper-slide.podcast-featured-slide.open")
      .classList.toggle("open");
  }
  item.classList.toggle("smaller");
  item.parentElement.parentElement.classList.toggle("open");
  let index = slides.indexOf(item);
  let activeIndex = slides.indexOf(
    document.querySelector(".swiper-slide-active").firstChild.firstChild
      .nextSibling
  );
  if (activeIndex > index) {
    setTimeout(() => {
      podcastSwiper.destroy();
      podcastSwiper = new Swiper("#podcast-swiper", {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        initialSlide: index,
        threshold: 24,
        spaceBetween: 16,
        grabCursor: true,
        allowTouchMove: true,
        navigation: {
          nextEl: "#right-button",
          prevEl: "#left-button",
        },
      });
    }, 750);
  } else {
    setTimeout(() => {
      podcastSwiper.destroy();
      podcastSwiper = new Swiper("#podcast-swiper", {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        initialSlide: activeIndex,
        spaceBetween: 16,
        threshold: 24,
        grabCursor: true,
        allowTouchMove: true,
        navigation: {
          nextEl: "#right-button",
          prevEl: "#left-button",
        },
      });
    }, 750);
  }
}
