const updateCount = (data) => {
  const slideEls = document.querySelectorAll(
    "div#solutions-slider div.swiper-slide"
  );

  slideEls.forEach((slideEl) => {
    const countEl = slideEl.querySelector(
      "div.mini-text.text-secondary div:first-child"
    );
    const linkEl = slideEl.querySelector("a.solution-template-category-card");
    const slug = linkEl.getAttribute("href").split("/")[2];

    const item = data.find(({ slug: Slug }) => Slug === slug);
    if (item) {
      countEl.textContent = item.count;
    }
  });
};

window.addEventListener("load", () => {
  fetch(
    "https://mpe6huiyg9.execute-api.us-east-1.amazonaws.com/prod/solution-tabs-count",
    {
      method: "GET",
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.status) {
        updateCount(data.data);
      } else throw new Error(data.data && data.data.msg);
    })
    .catch((err) => {
      console.log(err);
    });
});
