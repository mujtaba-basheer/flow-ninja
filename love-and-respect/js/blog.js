window.addEventListener("load", () => {
    const limit = 4;
    const [, type, id] = window.location.pathname.split("/");
    if (type === "blog") {
        const articles = JSON.parse(localStorage.getItem("blog") || "[]");
        const articleIndex = articles.findIndex((a) => a.id === id);
        if (articleIndex !== -1) {
            for (let i = articleIndex; i > 0; i--) {
                const temp = articles[i];
                articles[i] = articles[i - 1];
                articles[i - 1] = temp;
            }
        }
        else {
            const articleDetails = {
                id: id,
                heading: "",
                image_url: "",
                time_to_read: "",
                paragraph_text: "",
                category: "",
                url: "",
            };
            articleDetails.url = window.location.href;
            // extracting heading
            const headingEl = document.querySelector("h1#card-heading");
            if (headingEl)
                articleDetails.heading = headingEl.textContent + "";
            // extracting image url
            const imageEl = document.querySelector("img#card-image");
            if (imageEl)
                articleDetails.image_url = imageEl.src;
            // extracting time to read
            const ttrEl = document.querySelector("div#time-to-read");
            if (ttrEl)
                articleDetails.time_to_read = ttrEl.textContent + "";
            // extracting paragraph text
            const richTextEl = document.querySelector(`div[data-rich-text="paragraph"]`);
            if (richTextEl) {
                const paraEl = richTextEl.querySelector("p");
                if (paraEl)
                    articleDetails.paragraph_text = paraEl.textContent + "";
            }
            // extracting category
            const categoryEl = document.querySelector("div#card-category");
            if (categoryEl)
                articleDetails.category = categoryEl.textContent + "";
            if (articles.length === limit)
                articles.pop();
            articles.unshift(articleDetails);
        }
        localStorage.setItem("blog", JSON.stringify(articles));
    }
    else if (type === "courses") {
        const courses = JSON.parse(localStorage.getItem("courses") || "[]");
        const courseIndex = courses.findIndex((a) => a.id === id);
        if (courseIndex !== -1) {
            for (let i = courseIndex; i > 0; i--) {
                const temp = courses[i];
                courses[i] = courses[i - 1];
                courses[i - 1] = temp;
            }
        }
        else {
            const courseDetails = {
                id: id,
                heading: "",
                image_url: "",
                url: "",
            };
            courseDetails.url = window.location.href;
            // extracting heading
            const headingEl = document.querySelector("h1#card-heading");
            if (headingEl)
                courseDetails.heading = headingEl.textContent + "";
            // extracting image url
            const imageEl = document.querySelector("img#card-image");
            if (imageEl)
                courseDetails.image_url = imageEl.src;
            if (courses.length === limit)
                courses.pop();
            courses.unshift(courseDetails);
        }
        localStorage.setItem("courses", JSON.stringify(courses));
    }
});
