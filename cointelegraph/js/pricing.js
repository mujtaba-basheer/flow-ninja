window.addEventListener("load", async () => {
    try {
        const Wized = window.Wized;
        const monthlyTab = document.querySelector(`div[data-w-tab="Monthly "]`);
        const yearlyTab = document.querySelector(`div[data-w-tab="Yearly"]`);
        if (monthlyTab && yearlyTab) {
            const monthlyCards = monthlyTab.querySelectorAll("div.plan-card-pricing");
            const yearlyCards = yearlyTab.querySelectorAll("div.plan-card-pricing");
            // checking for login
            const token = await Wized.data.get("c.token");
            Wized.data.listen("r.3.d", async () => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const userData = await Wized.data.get("r.3.d.result_1");
                if (userData &&
                    userData.message !== "ERROR_CODE_UNAUTHORIZED" &&
                    token) {
                    const { subscription_period, plan_type } = userData;
                    switch (subscription_period) {
                        case "yearly": {
                            const yearlyTabLink = document.querySelector(`a[data-w-tab="Yearly"]`);
                            if (yearlyTabLink)
                                $(yearlyTabLink).trigger("click");
                            switch (plan_type) {
                                case "free": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, a.downgrade-button-monthly";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, a.downgrade-button-yearly";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        let upgradeBtn = proCard.querySelector("a.upgrade-button-monthly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_a = upgradeBtn.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newBtn, upgradeBtn);
                                        }
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        upgradeBtn = proCard.querySelector("a.upgrade-button-yearly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_b = upgradeBtn.parentNode) === null || _b === void 0 ? void 0 : _b.replaceChild(newBtn, upgradeBtn);
                                        }
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        let upgradeBtn = premiumCard.querySelector("a.upgrade-button-monthly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_c = upgradeBtn.parentNode) === null || _c === void 0 ? void 0 : _c.replaceChild(newBtn, upgradeBtn);
                                        }
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        upgradeBtn = premiumCard.querySelector("a.upgrade-button-yearly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_d = upgradeBtn.parentNode) === null || _d === void 0 ? void 0 : _d.replaceChild(newBtn, upgradeBtn);
                                        }
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "pro": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, a.downgrade-button-yearly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "premium": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, a.upgrade-button-yearly";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "enterprise": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, a.downgrade-button-yearly";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                        default: {
                            switch (plan_type) {
                                case "free": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, a.downgrade-button-monthly";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, a.downgrade-button-yearly";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        let upgradeBtn = proCard.querySelector("a.upgrade-button-monthly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_e = upgradeBtn.parentNode) === null || _e === void 0 ? void 0 : _e.replaceChild(newBtn, upgradeBtn);
                                        }
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, div.current-plan-button, a.downgrade-button-yearly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        upgradeBtn = proCard.querySelector("a.upgrade-button-yearly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_f = upgradeBtn.parentNode) === null || _f === void 0 ? void 0 : _f.replaceChild(newBtn, upgradeBtn);
                                        }
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        let upgradeBtn = premiumCard.querySelector("a.upgrade-button-monthly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_g = upgradeBtn.parentNode) === null || _g === void 0 ? void 0 : _g.replaceChild(newBtn, upgradeBtn);
                                        }
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        upgradeBtn = premiumCard.querySelector("a.upgrade-button-yearly");
                                        if (upgradeBtn) {
                                            upgradeBtn.href = "/subscription-process";
                                            const newBtn = upgradeBtn.cloneNode(true);
                                            (_h = upgradeBtn.parentNode) === null || _h === void 0 ? void 0 : _h.replaceChild(newBtn, upgradeBtn);
                                        }
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "pro": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, a.downgrade-button-monthly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, div.current-plan-button, a.downgrade-button-yearly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "premium": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, div.current-plan-button, a.upgrade-button-yearly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, a.downgrade-button-monthly";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                                case "enterprise": {
                                    // free cards
                                    {
                                        let freeCard = monthlyCards.item(0);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        freeCard = yearlyCards.item(0);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        freeCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // pro cards
                                    {
                                        let proCard = monthlyCards.item(1);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        proCard = yearlyCards.item(1);
                                        selectors =
                                            "a.signup-button-yearly, div.current-plan-button, a.upgrade-button-yearly";
                                        proCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // premium cards
                                    {
                                        let premiumCard = monthlyCards.item(2);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        premiumCard = yearlyCards.item(2);
                                        selectors =
                                            "a.signup-button-yearly, a.upgrade-button-yearly, div.current-plan-button";
                                        premiumCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    // enterprise cards
                                    {
                                        let enterpriseCard = monthlyCards.item(3);
                                        let selectors = "a.signup-monthly, a.upgrade-button-monthly, a.downgrade-button-monthly";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                        enterpriseCard = yearlyCards.item(3);
                                        selectors =
                                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                                        enterpriseCard
                                            .querySelectorAll(selectors)
                                            .forEach((el) => el.remove());
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                else {
                    // free cards
                    {
                        let freeCard = monthlyCards.item(0);
                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                        freeCard.querySelectorAll(selectors).forEach((el) => el.remove());
                        freeCard = yearlyCards.item(0);
                        selectors =
                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                        freeCard.querySelectorAll(selectors).forEach((el) => el.remove());
                    }
                    // pro cards
                    {
                        let proCard = monthlyCards.item(1);
                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                        proCard.querySelectorAll(selectors).forEach((el) => el.remove());
                        proCard = yearlyCards.item(1);
                        selectors =
                            "div.current-plan-button, a.downgrade-button-yearly, a.upgrade-button-yearly";
                        proCard.querySelectorAll(selectors).forEach((el) => el.remove());
                    }
                    // premium cards
                    {
                        let premiumCard = monthlyCards.item(2);
                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                        premiumCard
                            .querySelectorAll(selectors)
                            .forEach((el) => el.remove());
                        premiumCard = yearlyCards.item(2);
                        selectors =
                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                        premiumCard
                            .querySelectorAll(selectors)
                            .forEach((el) => el.remove());
                    }
                    // enterprise cards
                    {
                        let enterpriseCard = monthlyCards.item(3);
                        let selectors = "a.upgrade-button-monthly, a.downgrade-button-monthly, div.current-plan-button";
                        enterpriseCard
                            .querySelectorAll(selectors)
                            .forEach((el) => el.remove());
                        enterpriseCard = yearlyCards.item(3);
                        selectors =
                            "a.upgrade-button-yearly, a.downgrade-button-yearly, div.current-plan-button";
                        enterpriseCard
                            .querySelectorAll(selectors)
                            .forEach((el) => el.remove());
                    }
                }
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
