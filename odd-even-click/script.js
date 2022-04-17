// 1st Page
window.addEventListener("load", function () {
  $("#<category-link-id>").on("click", function () {
    const category = $(this).attr("data-name");
    window.location.href = "<next-page-url>?category=" + category;
  });
});

// 2nd Page
window.addEventListener("load", function () {
  const queryStr = window.location.href.split("?")[0];
  for (const attrs of queryStr.split("&")) {
    const [key, val] = attrs.split("=");
    if (key === "category") {
      $(`#${val}`).trigger("click");
    }
  }
});
