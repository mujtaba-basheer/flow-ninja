const attachClasses = () => {
  setTimeout(() => {
    const allSlides = document.querySelectorAll(
      ".thumbs-swiper-container .thumbs-swiper-slide"
    );
    allSlides.forEach((slide) => {
      slide.classList.remove("first");
      slide.classList.remove("last");
    });

    const visibleSlides = document.querySelectorAll(
      ".thumbs-swiper-container .thumbs-swiper-slide.swiper-slide-visible"
    );
    visibleSlides[0].classList.add("first");
    visibleSlides[visibleSlides.length - 1].classList.add("last");
  }, 500);
};
galleryThumbs.on("afterInit", attachClasses);
galleryThumbs.on("slideChange", attachClasses);
