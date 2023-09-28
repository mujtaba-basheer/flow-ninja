window.addEventListener("load", () => {
    // Recently Visited
    {
        const recently_visited_items = JSON.parse(localStorage.getItem("recently-visited-items") || "[]");
        const rootEl = document.querySelector("div.blogs-container");
        if (rootEl) {
            if (recently_visited_items.length === 0) {
                const itemsWrapper = rootEl.parentElement;
                if (itemsWrapper)
                    itemsWrapper.remove();
                const headingWrapper = document.querySelector("div#recently-visited");
                if (headingWrapper)
                    headingWrapper.remove();
            }
            else {
                for (const recently_visited_item of recently_visited_items) {
                    const { heading, url, image_url } = recently_visited_item;
                    if (!(heading && url && image_url))
                        continue;
                    if (recently_visited_item.type === "blog") {
                        try {
                            const { id, heading, image_url, time_to_read, paragraph_text, category, color, url, } = recently_visited_item;
                            const cardEl = document.createElement("div");
                            cardEl.id = id;
                            cardEl.className =
                                "recently-visited-card cms-item first-item-top-line w-dyn-item";
                            {
                                const linkEl = document.createElement("a");
                                linkEl.className = "cms-card w-inline-block";
                                linkEl.href = url;
                                {
                                    const imgWrapperEl = document.createElement("div");
                                    imgWrapperEl.className = "cms-image-wrapper";
                                    {
                                        const imgEl = document.createElement("img");
                                        imgEl.className = "cms-image";
                                        imgEl.src = image_url;
                                        imgEl.loading = "lazy";
                                        imgEl.alt = "";
                                        const categoryEl = document.createElement("div");
                                        categoryEl.className = "category-tag";
                                        categoryEl.style.color = color.text;
                                        categoryEl.style.backgroundColor = color.tag;
                                        categoryEl.textContent = category;
                                        imgWrapperEl.appendChild(imgEl);
                                        imgWrapperEl.appendChild(categoryEl);
                                    }
                                    const contentWrapperEl = document.createElement("div");
                                    contentWrapperEl.className = "cms-card-content";
                                    {
                                        const columnEl = document.createElement("div");
                                        columnEl.className = "column";
                                        {
                                            const headingEl = document.createElement("h3");
                                            headingEl.className = "h5-style";
                                            headingEl.textContent = heading;
                                            const paraEl = document.createElement("p");
                                            paraEl.className = "text-small mobile-invisible";
                                            paraEl.textContent = paragraph_text;
                                            columnEl.appendChild(headingEl);
                                            columnEl.appendChild(paraEl);
                                        }
                                        const infoWrapperEl = document.createElement("div");
                                        infoWrapperEl.className = "episode-info-wrapper";
                                        {
                                            const iconEl = document.createElement("img");
                                            iconEl.className = "episode-info-icon duration";
                                            iconEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e57b1601ec482e3c00_62ebb42548dda87c21df1a0f_clock.svg";
                                            iconEl.alt = "Image duration icon";
                                            iconEl.loading = "lazy";
                                            const ttrEl = document.createElement("div");
                                            ttrEl.className = "margin-right-4";
                                            ttrEl.textContent = time_to_read;
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "min read";
                                            infoWrapperEl.appendChild(iconEl);
                                            infoWrapperEl.appendChild(ttrEl);
                                            infoWrapperEl.appendChild(divEl);
                                        }
                                        contentWrapperEl.appendChild(columnEl);
                                        contentWrapperEl.appendChild(infoWrapperEl);
                                    }
                                    linkEl.appendChild(imgWrapperEl);
                                    linkEl.appendChild(contentWrapperEl);
                                }
                                const socialWrapper = document.createElement("div");
                                socialWrapper.className = "social-share-wrapper";
                                {
                                    const shareBlockEl = document.createElement("div");
                                    shareBlockEl.className = "social-share-block";
                                    shareBlockEl.style.transform =
                                        "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                    shareBlockEl.style.display = "none";
                                    shareBlockEl.style.opacity = "0";
                                    shareBlockEl.style.transformStyle = "preserve-3d";
                                    {
                                        const dividerEl = document.createElement("div");
                                        dividerEl.className = "horizontal-divider margin-bot-8";
                                        const fbShareEl = document.createElement("a");
                                        fbShareEl.className =
                                            "social-share-button facebook w-inline-block";
                                        fbShareEl.rel = "noopener";
                                        fbShareEl.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                                        fbShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Facebook Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7ac9cfa69e1332241_62ee2aabd05b79c705f5bf20_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            fbShareEl.appendChild(imgEl);
                                            fbShareEl.appendChild(divEl);
                                        }
                                        const twitterShareEl = document.createElement("a");
                                        twitterShareEl.className =
                                            "social-share-button twitter w-inline-block";
                                        twitterShareEl.rel = "noopener";
                                        twitterShareEl.href = `https://twitter.com/share?url=${url}`;
                                        twitterShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Twitter Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7d970244ea40bed6c_62ee2b530c783ab651cd7461_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            twitterShareEl.appendChild(imgEl);
                                            twitterShareEl.appendChild(divEl);
                                        }
                                        const emailShareEl = document.createElement("a");
                                        emailShareEl.className =
                                            "social-share-button email w-inline-block";
                                        emailShareEl.rel = "noopener";
                                        emailShareEl.href = `mailto:example@example.com?subject=${heading}&body=Visit our page on a link: %0A${url}`;
                                        emailShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Email Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e71b9664905cc20f9d_62ee2b6fd05b798d38f5c924_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            emailShareEl.appendChild(imgEl);
                                            emailShareEl.appendChild(divEl);
                                        }
                                        const closeEl = document.createElement("div");
                                        closeEl.className = "social-share-close-button";
                                        closeEl.textContent = "Close";
                                        closeEl.addEventListener("click", () => {
                                            $(shareBlockEl).animate({
                                                opacity: 1,
                                            }, 250, () => {
                                                shareBlockEl.style.display = "none";
                                                shareBlockEl.style.transform =
                                                    "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg))";
                                            });
                                        });
                                        shareBlockEl.appendChild(fbShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(twitterShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(emailShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(closeEl);
                                    }
                                    const dotsEl = document.createElement("div");
                                    dotsEl.className = "cms-card-share-dots";
                                    dotsEl.style.opacity = "0";
                                    dotsEl.style.display = "none";
                                    {
                                        const firstDotEl = document.createElement("div");
                                        firstDotEl.className = "share-dot first";
                                        const secondDotEl = document.createElement("div");
                                        secondDotEl.className = "share-dot";
                                        const thirdDotEl = document.createElement("div");
                                        thirdDotEl.className = "share-dot";
                                        dotsEl.appendChild(firstDotEl);
                                        dotsEl.appendChild(secondDotEl);
                                        dotsEl.appendChild(thirdDotEl);
                                    }
                                    cardEl.addEventListener("mouseenter", () => {
                                        dotsEl.style.display = "flex";
                                        $(dotsEl).animate({
                                            opacity: 1,
                                        }, 200);
                                    });
                                    cardEl.addEventListener("mouseleave", () => {
                                        dotsEl.style.display = "none";
                                        $(dotsEl).animate({
                                            opacity: 0,
                                        }, 200);
                                    });
                                    dotsEl.addEventListener("click", () => {
                                        shareBlockEl.style.display = "flex";
                                        shareBlockEl.style.transform =
                                            "translate3d(0%, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                        $(shareBlockEl).animate({
                                            opacity: 1,
                                        }, 250);
                                    });
                                    socialWrapper.appendChild(shareBlockEl);
                                    socialWrapper.appendChild(dotsEl);
                                }
                                cardEl.appendChild(linkEl);
                                cardEl.appendChild(socialWrapper);
                            }
                            rootEl.appendChild(cardEl);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    else if (recently_visited_item.type === "podcast") {
                        try {
                            const { id, heading, image_url, episode_number, length, paragraph_text, category, color, url, } = recently_visited_item;
                            const cardEl = document.createElement("div");
                            cardEl.id = id;
                            cardEl.className =
                                "recently-visited-card cms-item first-item-top-line w-dyn-item";
                            {
                                const linkEl = document.createElement("a");
                                linkEl.className = "cms-card w-inline-block";
                                linkEl.href = url;
                                {
                                    const imgWrapperEl = document.createElement("div");
                                    imgWrapperEl.className = "cms-image-wrapper";
                                    {
                                        const imgEl = document.createElement("img");
                                        imgEl.className = "cms-image";
                                        imgEl.src = image_url;
                                        imgEl.loading = "lazy";
                                        imgEl.alt = "";
                                        const categoryEl = document.createElement("div");
                                        categoryEl.className = "category-tag";
                                        categoryEl.style.color = color.text;
                                        categoryEl.style.backgroundColor = color.tag;
                                        categoryEl.textContent = category;
                                        imgWrapperEl.appendChild(imgEl);
                                        imgWrapperEl.appendChild(categoryEl);
                                    }
                                    const contentWrapperEl = document.createElement("div");
                                    contentWrapperEl.className = "cms-card-content";
                                    {
                                        const columnEl = document.createElement("div");
                                        columnEl.className = "column";
                                        {
                                            const headingEl = document.createElement("h3");
                                            headingEl.className = "h5-style";
                                            headingEl.textContent = heading;
                                            const paraEl = document.createElement("p");
                                            paraEl.className = "text-small mobile-invisible";
                                            paraEl.textContent = paragraph_text;
                                            columnEl.appendChild(headingEl);
                                            columnEl.appendChild(paraEl);
                                        }
                                        const flexEl = document.createElement("div");
                                        flexEl.className = "cms-item-metadata-wrap";
                                        {
                                            const infoWrapperEl_1 = document.createElement("div");
                                            infoWrapperEl_1.className = "episode-info-wrapper";
                                            {
                                                const iconEl = document.createElement("img");
                                                iconEl.className = "episode-info-icon";
                                                iconEl.src =
                                                    "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e5c7efcbf2ad94dc26_62ebb4190e07f177fed1f307_Group%2071439.svg";
                                                iconEl.alt = "Episode Number Icon";
                                                iconEl.loading = "lazy";
                                                const divEl = document.createElement("div");
                                                divEl.textContent = "Episode";
                                                const epNoEl = document.createElement("div");
                                                epNoEl.className = "episode-number";
                                                epNoEl.textContent = episode_number;
                                                infoWrapperEl_1.appendChild(iconEl);
                                                infoWrapperEl_1.appendChild(divEl);
                                                infoWrapperEl_1.appendChild(epNoEl);
                                            }
                                            const infoWrapperEl_2 = document.createElement("div");
                                            infoWrapperEl_2.className = "episode-info-wrapper";
                                            {
                                                const iconEl = document.createElement("img");
                                                iconEl.className = "episode-info-icon duration";
                                                iconEl.src =
                                                    "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e57b1601ec482e3c00_62ebb42548dda87c21df1a0f_clock.svg";
                                                iconEl.alt = "Image duration icon";
                                                iconEl.loading = "lazy";
                                                const lengthEl = document.createElement("div");
                                                lengthEl.textContent = length;
                                                infoWrapperEl_2.appendChild(iconEl);
                                                infoWrapperEl_2.appendChild(lengthEl);
                                            }
                                            flexEl.appendChild(infoWrapperEl_1);
                                            flexEl.appendChild(infoWrapperEl_2);
                                        }
                                        contentWrapperEl.appendChild(columnEl);
                                        contentWrapperEl.appendChild(flexEl);
                                    }
                                    linkEl.appendChild(imgWrapperEl);
                                    linkEl.appendChild(contentWrapperEl);
                                }
                                const socialWrapper = document.createElement("div");
                                socialWrapper.className = "social-share-wrapper";
                                {
                                    const shareBlockEl = document.createElement("div");
                                    shareBlockEl.className = "social-share-block";
                                    shareBlockEl.style.transform =
                                        "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                    shareBlockEl.style.display = "none";
                                    shareBlockEl.style.opacity = "0";
                                    shareBlockEl.style.transformStyle = "preserve-3d";
                                    {
                                        const dividerEl = document.createElement("div");
                                        dividerEl.className = "horizontal-divider margin-bot-8";
                                        const fbShareEl = document.createElement("a");
                                        fbShareEl.className =
                                            "social-share-button facebook w-inline-block";
                                        fbShareEl.rel = "noopener";
                                        fbShareEl.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                                        fbShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Facebook Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7ac9cfa69e1332241_62ee2aabd05b79c705f5bf20_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            fbShareEl.appendChild(imgEl);
                                            fbShareEl.appendChild(divEl);
                                        }
                                        const twitterShareEl = document.createElement("a");
                                        twitterShareEl.className =
                                            "social-share-button twitter w-inline-block";
                                        twitterShareEl.rel = "noopener";
                                        twitterShareEl.href = `https://twitter.com/share?url=${url}`;
                                        twitterShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Twitter Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7d970244ea40bed6c_62ee2b530c783ab651cd7461_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            twitterShareEl.appendChild(imgEl);
                                            twitterShareEl.appendChild(divEl);
                                        }
                                        const emailShareEl = document.createElement("a");
                                        emailShareEl.className =
                                            "social-share-button email w-inline-block";
                                        emailShareEl.rel = "noopener";
                                        emailShareEl.href = `mailto:example@example.com?subject=${heading}&body=Visit our page on a link: %0A${url}`;
                                        emailShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Email Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e71b9664905cc20f9d_62ee2b6fd05b798d38f5c924_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            emailShareEl.appendChild(imgEl);
                                            emailShareEl.appendChild(divEl);
                                        }
                                        const closeEl = document.createElement("div");
                                        closeEl.className = "social-share-close-button";
                                        closeEl.textContent = "Close";
                                        closeEl.addEventListener("click", () => {
                                            $(shareBlockEl).animate({
                                                opacity: 1,
                                            }, 250, () => {
                                                shareBlockEl.style.display = "none";
                                                shareBlockEl.style.transform =
                                                    "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg))";
                                            });
                                        });
                                        shareBlockEl.appendChild(fbShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(twitterShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(emailShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(closeEl);
                                    }
                                    const dotsEl = document.createElement("div");
                                    dotsEl.className = "cms-card-share-dots";
                                    dotsEl.style.opacity = "0";
                                    dotsEl.style.display = "none";
                                    {
                                        const firstDotEl = document.createElement("div");
                                        firstDotEl.className = "share-dot first";
                                        const secondDotEl = document.createElement("div");
                                        secondDotEl.className = "share-dot";
                                        const thirdDotEl = document.createElement("div");
                                        thirdDotEl.className = "share-dot";
                                        dotsEl.appendChild(firstDotEl);
                                        dotsEl.appendChild(secondDotEl);
                                        dotsEl.appendChild(thirdDotEl);
                                    }
                                    cardEl.addEventListener("mouseenter", () => {
                                        dotsEl.style.display = "flex";
                                        $(dotsEl).animate({
                                            opacity: 1,
                                        }, 200);
                                    });
                                    cardEl.addEventListener("mouseleave", () => {
                                        dotsEl.style.display = "none";
                                        $(dotsEl).animate({
                                            opacity: 0,
                                        }, 200);
                                    });
                                    dotsEl.addEventListener("click", () => {
                                        shareBlockEl.style.display = "flex";
                                        shareBlockEl.style.transform =
                                            "translate3d(0%, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                        $(shareBlockEl).animate({
                                            opacity: 1,
                                        }, 250);
                                    });
                                    socialWrapper.appendChild(shareBlockEl);
                                    socialWrapper.appendChild(dotsEl);
                                }
                                cardEl.appendChild(linkEl);
                                cardEl.appendChild(socialWrapper);
                            }
                            rootEl.appendChild(cardEl);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                    else if (recently_visited_item.type === "ask-emerson") {
                        try {
                            const { id, heading, image_url, length, category, color, url, paragraph_text, } = recently_visited_item;
                            const cardEl = document.createElement("div");
                            cardEl.id = id;
                            cardEl.className =
                                "recently-visited-card cms-item first-item-top-line w-dyn-item";
                            {
                                const linkEl = document.createElement("a");
                                linkEl.className = "cms-card w-inline-block";
                                linkEl.href = url;
                                {
                                    const imgWrapperEl = document.createElement("div");
                                    imgWrapperEl.className = "cms-image-wrapper";
                                    {
                                        const imgEl = document.createElement("img");
                                        imgEl.className = "cms-image";
                                        imgEl.src = image_url;
                                        imgEl.loading = "lazy";
                                        imgEl.alt = "";
                                        const categoryEl = document.createElement("div");
                                        categoryEl.className = "category-tag";
                                        categoryEl.style.color = color.text;
                                        categoryEl.style.backgroundColor = color.tag;
                                        categoryEl.textContent = category;
                                        imgWrapperEl.appendChild(imgEl);
                                        imgWrapperEl.appendChild(categoryEl);
                                    }
                                    const contentWrapperEl = document.createElement("div");
                                    contentWrapperEl.className = "cms-card-content";
                                    {
                                        const columnEl = document.createElement("div");
                                        columnEl.className = "column";
                                        {
                                            const headingEl = document.createElement("h3");
                                            headingEl.className = "h5-style";
                                            headingEl.textContent = heading;
                                            const paraEl = document.createElement("p");
                                            paraEl.className = "text-small mobile-invisible";
                                            paraEl.textContent = paragraph_text;
                                            columnEl.appendChild(headingEl);
                                            columnEl.appendChild(paraEl);
                                        }
                                        const infoWrapperEl = document.createElement("div");
                                        infoWrapperEl.className = "cms-item-metadata-wrap";
                                        {
                                            const divEl_1 = document.createElement("div");
                                            divEl_1.className = "episode-info-wrapper";
                                            {
                                                const iconEl = document.createElement("img");
                                                iconEl.className = "episode-info-icon";
                                                iconEl.src =
                                                    "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/63c99c899402791cb7f28e49_Ask%20Emerson%20Icon.svg";
                                                iconEl.alt = "Ask Emerson Icon";
                                                iconEl.loading = "lazy";
                                                const divEl = document.createElement("div");
                                                divEl.textContent = "Ask Emerson";
                                                divEl_1.appendChild(iconEl);
                                                divEl_1.appendChild(divEl);
                                            }
                                            const divEl_2 = document.createElement("div");
                                            divEl_2.className = "episode-info-wrapper";
                                            {
                                                const iconEl = document.createElement("img");
                                                iconEl.className = "episode-info-icon duration";
                                                iconEl.src =
                                                    "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/63ecc09ee401e90bc1a33848_Vid%20Icon.svg";
                                                iconEl.alt = "";
                                                iconEl.loading = "lazy";
                                                const lengthEl = document.createElement("div");
                                                lengthEl.textContent = length;
                                                divEl_2.appendChild(iconEl);
                                                divEl_2.appendChild(lengthEl);
                                            }
                                            infoWrapperEl.appendChild(divEl_1);
                                            infoWrapperEl.appendChild(divEl_2);
                                        }
                                        contentWrapperEl.appendChild(columnEl);
                                        contentWrapperEl.appendChild(infoWrapperEl);
                                    }
                                    linkEl.appendChild(imgWrapperEl);
                                    linkEl.appendChild(contentWrapperEl);
                                }
                                const socialWrapper = document.createElement("div");
                                socialWrapper.className = "social-share-wrapper";
                                {
                                    const shareBlockEl = document.createElement("div");
                                    shareBlockEl.className = "social-share-block";
                                    shareBlockEl.style.transform =
                                        "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                    shareBlockEl.style.display = "none";
                                    shareBlockEl.style.opacity = "0";
                                    shareBlockEl.style.transformStyle = "preserve-3d";
                                    {
                                        const dividerEl = document.createElement("div");
                                        dividerEl.className = "horizontal-divider margin-bot-8";
                                        const fbShareEl = document.createElement("a");
                                        fbShareEl.className =
                                            "social-share-button facebook w-inline-block";
                                        fbShareEl.rel = "noopener";
                                        fbShareEl.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                                        fbShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Facebook Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7ac9cfa69e1332241_62ee2aabd05b79c705f5bf20_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            fbShareEl.appendChild(imgEl);
                                            fbShareEl.appendChild(divEl);
                                        }
                                        const twitterShareEl = document.createElement("a");
                                        twitterShareEl.className =
                                            "social-share-button twitter w-inline-block";
                                        twitterShareEl.rel = "noopener";
                                        twitterShareEl.href = `https://twitter.com/share?url=${url}`;
                                        twitterShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Twitter Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e7d970244ea40bed6c_62ee2b530c783ab651cd7461_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            twitterShareEl.appendChild(imgEl);
                                            twitterShareEl.appendChild(divEl);
                                        }
                                        const emailShareEl = document.createElement("a");
                                        emailShareEl.className =
                                            "social-share-button email w-inline-block";
                                        emailShareEl.rel = "noopener";
                                        emailShareEl.href = `mailto:example@example.com?subject=${heading}&body=Visit our page on a link: %0A${url}`;
                                        emailShareEl.target = "_blank";
                                        {
                                            const imgEl = document.createElement("img");
                                            imgEl.className = "social-share-icon";
                                            imgEl.loading = "lazy";
                                            imgEl.alt = "Email Icon";
                                            imgEl.src =
                                                "https://assets-global.website-files.com/6033bb06812d4c6b521b0c9e/630903e71b9664905cc20f9d_62ee2b6fd05b798d38f5c924_Vector.svg";
                                            const divEl = document.createElement("div");
                                            divEl.textContent = "Share";
                                            emailShareEl.appendChild(imgEl);
                                            emailShareEl.appendChild(divEl);
                                        }
                                        const closeEl = document.createElement("div");
                                        closeEl.className = "social-share-close-button";
                                        closeEl.textContent = "Close";
                                        closeEl.addEventListener("click", () => {
                                            $(shareBlockEl).animate({
                                                opacity: 1,
                                            }, 250, () => {
                                                shareBlockEl.style.display = "none";
                                                shareBlockEl.style.transform =
                                                    "translate3d(105%, -105%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg))";
                                            });
                                        });
                                        shareBlockEl.appendChild(fbShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(twitterShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(emailShareEl);
                                        shareBlockEl.appendChild(dividerEl.cloneNode());
                                        shareBlockEl.appendChild(closeEl);
                                    }
                                    const dotsEl = document.createElement("div");
                                    dotsEl.className = "cms-card-share-dots";
                                    dotsEl.style.opacity = "0";
                                    dotsEl.style.display = "none";
                                    {
                                        const firstDotEl = document.createElement("div");
                                        firstDotEl.className = "share-dot first";
                                        const secondDotEl = document.createElement("div");
                                        secondDotEl.className = "share-dot";
                                        const thirdDotEl = document.createElement("div");
                                        thirdDotEl.className = "share-dot";
                                        dotsEl.appendChild(firstDotEl);
                                        dotsEl.appendChild(secondDotEl);
                                        dotsEl.appendChild(thirdDotEl);
                                    }
                                    cardEl.addEventListener("mouseenter", () => {
                                        dotsEl.style.display = "flex";
                                        $(dotsEl).animate({
                                            opacity: 1,
                                        }, 200);
                                    });
                                    cardEl.addEventListener("mouseleave", () => {
                                        dotsEl.style.display = "none";
                                        $(dotsEl).animate({
                                            opacity: 0,
                                        }, 200);
                                    });
                                    dotsEl.addEventListener("click", () => {
                                        shareBlockEl.style.display = "flex";
                                        shareBlockEl.style.transform =
                                            "translate3d(0%, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)";
                                        $(shareBlockEl).animate({
                                            opacity: 1,
                                        }, 250);
                                    });
                                    socialWrapper.appendChild(shareBlockEl);
                                    socialWrapper.appendChild(dotsEl);
                                }
                                cardEl.appendChild(linkEl);
                                cardEl.appendChild(socialWrapper);
                            }
                            rootEl.appendChild(cardEl);
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        }
    }
    // Courses
    {
        const courses = JSON.parse(localStorage.getItem("courses") || "[]");
        const rootEl = document.querySelector("div.courses-list");
        if (rootEl) {
            if (courses.length === 0) {
                const sectionWrapper = document.querySelector("div#continue-course");
                if (sectionWrapper)
                    sectionWrapper.remove();
            }
            else {
                for (const course of courses) {
                    try {
                        const { id, heading, image_url, url } = course;
                        const cardEl = document.createElement("div");
                        cardEl.id = id;
                        cardEl.className = "cms-item course-item";
                        {
                            const linkEl = document.createElement("a");
                            linkEl.className = "course-link w-inline-block";
                            linkEl.href = url;
                            {
                                const imgEl = document.createElement("img");
                                imgEl.className = "course-preview-image";
                                imgEl.src = image_url;
                                imgEl.loading = "lazy";
                                imgEl.alt = "";
                                const contentWrapperEl = document.createElement("div");
                                contentWrapperEl.className = "course-name-wrapper";
                                {
                                    const headingEl = document.createElement("div");
                                    headingEl.className = "h5-style no-margin";
                                    headingEl.textContent = heading;
                                    contentWrapperEl.appendChild(headingEl);
                                }
                                linkEl.appendChild(imgEl);
                                linkEl.appendChild(contentWrapperEl);
                            }
                            cardEl.appendChild(linkEl);
                        }
                        rootEl.appendChild(cardEl);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        }
    }
});
