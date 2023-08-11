window.addEventListener("load", async () => {
  type ArticleT = {
    slug: string;
    access: {
      icon_url: string;
      type: string;
    };
    img_url: string;
    heading: string;
    published_by: string;
  };

  try {
    const xano_saved_articles_url = "";

    const Wized = window.Wized;
    await Wized.request.execute("Get User Data");

    // fetching user saved articles
    let saved_articles: Awaited<ArticleT[]> = await Wized.data.get(
      "r.3.d.result_1.saved_articles"
    );
    if (!saved_articles) saved_articles = [];
    let token = await Wized.data.get("c.token");

    const articleData: ArticleT = {
      slug: window.location.pathname.split("/")[2],
      access: {
        icon_url:
          document.querySelector<HTMLImageElement>(".badge-wrap img")?.src ||
          "",
        type:
          document.querySelector<HTMLImageElement>(".badge-wrap div")
            ?.textContent || "",
      },
      img_url:
        document.querySelector<HTMLImageElement>("img.articles-post-hero-image")
          ?.src || "",
      heading:
        document.querySelector<HTMLHeadingElement>("div.article-hero-column h1")
          ?.textContent || "",
      published_by: document.getElementById("publishedBy")?.textContent || "",
    };

    const svgEl = document.querySelector<Element>("div.save-wrapper svg");
    if (svgEl) {
      if (saved_articles.findIndex((a) => a.slug === articleData.slug) !== -1) {
        svgEl.classList.add("clicked");
      }

      svgEl.addEventListener("click", async () => {
        svgEl.classList.toggle("clicked");

        const action = svgEl.classList.contains("clicked") ? "save" : "remove";
        const body = {
          action,
          articleData,
        };
        const req = await fetch(xano_saved_articles_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (req.status !== 200) {
          svgEl.classList.remove("clicked");
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
});
