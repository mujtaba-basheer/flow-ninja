const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  loop: true,
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
