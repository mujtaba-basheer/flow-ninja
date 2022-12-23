type BgMapType = {
  [path: string]: string;
};

window.addEventListener("load", () => {
  const bgMap: BgMapType = {
    "/software-blog":
      "https://uploads-ssl.webflow.com/63078873858838fe95a00d2d/637f7b84caab7db4768e6176_unnamed.png",
    "/gridcog-blog":
      "https://uploads-ssl.webflow.com/63078873858838fe95a00d2d/6347ef788dcc88dbd4062509_Markets-Hero-Background.png",
    "/reports":
      "https://assets.website-files.com/63078873858838fe95a00d2d/634ebd5c8be4b276e717d6bd_Blogpost-Hero-Background.png",
  };

  const referrer = new URL(document.referrer);
  const blogHeroEl = document.querySelector<HTMLDivElement>("div.blog-hero-bg");
  if (blogHeroEl && bgMap[referrer.pathname]) {
    blogHeroEl.style.backgroundImage = `url("${bgMap[referrer.pathname]}")`;
  }
});
