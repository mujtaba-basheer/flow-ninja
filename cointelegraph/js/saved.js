window.addEventListener("load", async () => {
    var _a, _b, _c, _d, _e;
    try {
        const xano_saved_articles_url = "";
        const Wized = window.Wized;
        await Wized.request.execute("Get User Data");
        // fetching user saved articles
        let saved_articles = await Wized.data.get("r.3.d.result_1.saved_articles");
        if (!saved_articles)
            saved_articles = [];
        let token = await Wized.data.get("c.token");
        const articleData = {
            slug: window.location.pathname.split("/")[2],
            access: {
                icon_url: ((_a = document.querySelector(".badge-wrap img")) === null || _a === void 0 ? void 0 : _a.src) ||
                    "",
                type: ((_b = document.querySelector(".badge-wrap div")) === null || _b === void 0 ? void 0 : _b.textContent) || "",
            },
            img_url: ((_c = document.querySelector("img.articles-post-hero-image")) === null || _c === void 0 ? void 0 : _c.src) || "",
            heading: ((_d = document.querySelector("div.article-hero-column h1")) === null || _d === void 0 ? void 0 : _d.textContent) || "",
            published_by: ((_e = document.getElementById("publishedBy")) === null || _e === void 0 ? void 0 : _e.textContent) || "",
        };
        const svgEl = document.querySelector("div.save-wrapper svg");
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
    }
    catch (error) {
        console.error(error);
    }
});
