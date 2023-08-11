window.addEventListener("load", () => {
    const prefixes = [
        "en-en",
        "fr-fr",
        "de-de",
        "es-es",
        "it-it",
        "ar-ae",
        "ar-sa",
        "pt-pt",
        "zh-cn",
        "en-US",
    ];
    fetch("https://checkout-website-cko-web.vercel.app/api/geo")
        .then((res) => {
        if (res.status === 200)
            return res.json();
        else
            throw new Error(res.statusText);
    })
        .then((data) => {
        let lang = data["accept-language"];
        if (lang.includes(",")) {
            lang = lang.split(",")[0];
        }
        const langBanner = document.querySelector("div.language-banner");
        if (langBanner) {
            const closeBtn = langBanner.querySelector("img.language-banner-close");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    langBanner.style.display = "none";
                });
            }
        }
        if (!lang.startsWith("en")) {
            if (window.location.pathname === "/" && prefixes.includes(lang)) {
                window.location.pathname = `/${lang}`;
            }
            else if (langBanner &&
                !window.sessionStorage.getItem("__lang_changed")) {
                window.sessionStorage.setItem("__lang_changed", "true");
                langBanner.style.display = "flex";
            }
        }
        else if (langBanner)
            langBanner.style.display = "none";
    })
        .catch(console.error);
    const langDropdownLists = document.querySelectorAll("div.language-dropdown-inner-list div.countries-inner-wrap");
    {
        let { pathname } = window.location;
        let currLang = "en-en";
        for (const p of prefixes) {
            if (pathname.startsWith("/" + p)) {
                currLang = p;
                pathname = "/" + pathname.substring(p.length + 2);
            }
        }
        langDropdownLists.forEach((langDropdownList) => {
            const links = langDropdownList.querySelectorAll("a");
            links.forEach((linkEl) => {
                const id = linkEl.id;
                const langCode = id.substring(0, 5);
                const prefix = langCode === "en-en" ? "" : "/" + langCode;
                linkEl.addEventListener("click", () => {
                    if (currLang !== langCode) {
                        window.sessionStorage.setItem("__lang_changed", "true");
                        pathname = prefix + pathname;
                        window.location.pathname = pathname;
                    }
                });
            });
        });
    }
});
