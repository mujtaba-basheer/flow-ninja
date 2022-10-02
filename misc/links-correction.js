window.addEventListener("load", () => {
  const old = /https:\/\/support.upwork.com\/entries\/([-a-zA-z0-9]+?)[\/]?$/;
  const links = document.querySelectorAll("a");
  let c = 0;
  for (const link of links) {
    const href = link.getAttribute("href")?.trim();
    if (old.test(href)) {
      const articleId = href.split("/")[4];
      const newHref = `https://support.upwork.com/hc/en-us/articles/${articleId}`;
      link.setAttribute("href", newHref);
      c++;
    }
  }
  console.log({ c });
});

// let href = `https://support.upwork.com/entries/4402806386195-New-Freelancer-Features-Added-to-Project-Catalog-June-29-2021-/`;
// console.log(href.split("/"));
