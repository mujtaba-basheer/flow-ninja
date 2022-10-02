const minPackages = 0;
const maxPackages = 30000;
const power = 6;
const minStarter = 99;
const minPro = 399;
const dollarMultiple = 1.1;
const sdeMultiple = 0.25;
const feedbackMultiple = 0.35;
const pricingPoints = {
    250: 25.2,
    300: 23.9,
    350: 23,
    400: 22.3,
    450: 21.6,
    500: 21,
    550: 20.5,
    600: 20.1,
    700: 19.5,
    800: 19,
    900: 18.5,
    1000: 18.1,
    1100: 17.7,
    1200: 17.4,
    1300: 17.2,
    1400: 16.9,
    1500: 16.8,
    1600: 16.6,
    1700: 16.4,
    1800: 16.2,
    1900: 16,
    2000: 15.8,
    2100: 15.7,
    2200: 15.6,
    2300: 15.4,
    2400: 15.3,
    2500: 15.2,
    2600: 15.1,
    2800: 15,
    3000: 14.8,
    3200: 14.7,
    3400: 14.5,
    3600: 14.3,
    3800: 14.2,
    4000: 14,
    4200: 13.9,
    4400: 13.8,
    4600: 13.7,
    4800: 13.6,
    5000: 13.5,
    5500: 13.3,
    6000: 13.2,
    6500: 13,
    7000: 12.8,
    7500: 12.7,
    8000: 12.5,
    8500: 12.4,
    9000: 12.3,
    9500: 12.2,
    10000: 12.1,
    10500: 12,
    11000: 11.9,
    12000: 11.8,
    13000: 11.7,
    14000: 11.5,
    15000: 11.4,
    16000: 11.2,
    17000: 11.1,
    18000: 11,
    19000: 10.9,
    20000: 10.8,
    21000: 10.8,
    22000: 10.7,
    23000: 10.6,
    25000: 10.5,
    26000: 10.5,
    27000: 10.4,
    28000: 10.3,
    29000: 10.3,
    30000: 10.2,
};
function last(arr) {
    const len = arr.length;
    return arr[len - 1];
}
const transform = (value) => Math.round(((Math.exp((power * value) / maxPackages) - 1) / (Math.exp(power) - 1)) *
    maxPackages);
const reverse = (value) => (1 / power) *
    Math.log(((Math.exp(power) - 1) * value) / maxPackages + 1) *
    maxPackages;
const packageBasePrice = (packages) => {
    const priceSteps = Object.keys(pricingPoints).map((x) => +x);
    if (packages <= priceSteps[0]) {
        return 24;
    }
    else if (packages > last(priceSteps)) {
        return pricingPoints[last(priceSteps)];
    }
    const currentStep = last(priceSteps.filter((s) => packages >= s));
    return pricingPoints[currentStep];
};
window.addEventListener("load", () => {
    const state = {
        currencyEur: $("#country").val() === "EUR",
        value: 1000,
    };
    const formatPrice = (price, maximumFractionDigits = 0, lang, currencySymbol) => new Intl.NumberFormat(lang, {
        style: "currency",
        currency: currencySymbol,
        maximumFractionDigits,
        minimumFractionDigits: 0,
    }).format(price);
    const sliderValEl = document.getElementById("slider-value");
    const dispValEl = document.getElementById("real-value");
    const [starterCardEl, proCardEl, ,] = document.querySelectorAll(".pricing-card");
    const sdeEl = document.getElementById("smart-price");
    const feedbackEl = document.getElementById("feedback-price");
    const trackEl = document.querySelector(".fs-rangeslider_track");
    const formEl = document.querySelector("#email-form");
    const getPricing = (packages) => {
        const basePrice = packageBasePrice(packages);
        const currencyMultiple = state.currencyEur ? 1 : dollarMultiple;
        return (basePrice * currencyMultiple) / 100.0;
    };
    const calc = () => {
        const { value: packages, currencyEur } = state;
        dispValEl.value = packages + "";
        const pricing = getPricing(packages);
        // Starter Card
        {
            const firstStepEl = starterCardEl.querySelector(".first-step-starter");
            const secondStepEl = starterCardEl.querySelector(".second-step-starter");
            const thirdStepEl = starterCardEl.querySelector(".third-step-starter");
            if (pricing * packages >= minPro) {
                starterCardEl.classList.add("content-unavailable");
                if (thirdStepEl) {
                    const priceEl = thirdStepEl.querySelector("#starter-month");
                    if (priceEl)
                        priceEl.textContent = `Upgraded to Pro above ${currencyEur ? "€" : "$"}${minPro} / month`;
                }
                firstStepEl.style.display = "none";
                secondStepEl.style.display = "none";
                thirdStepEl.style.display = "block";
            }
            else {
                starterCardEl.classList.remove("content-unavailable");
                if (pricing * packages < minStarter) {
                    const priceEl = firstStepEl.querySelector("span#starter-price");
                    if (priceEl)
                        priceEl.textContent = formatPrice(minStarter, 0, "en", currencyEur ? "EUR" : "USD");
                    firstStepEl.style.display = "block";
                    secondStepEl.style.display = "none";
                    thirdStepEl.style.display = "none";
                }
                else {
                    const priceElpp = secondStepEl.querySelector("span#starter-price-second-step");
                    if (priceElpp)
                        priceElpp.textContent = formatPrice(pricing, 2, "en", currencyEur ? "EUR" : "USD");
                    const priceElpm = secondStepEl.querySelector("span#second-step-starter-per-month");
                    if (priceElpm)
                        priceElpm.textContent = formatPrice(pricing * packages, 2, "en", currencyEur ? "EUR" : "USD");
                    firstStepEl.style.display = "none";
                    secondStepEl.style.display = "block";
                    thirdStepEl.style.display = "none";
                }
            }
        }
        // Pro Card
        {
            const firstStepEl = proCardEl.querySelector(".first-step-pro");
            const secondStepEl = proCardEl.querySelector(".second-step-pro");
            const thirdStepEl = proCardEl.querySelector(".third-step-pro");
            const linkEl = proCardEl.querySelector("a");
            if (packages >= maxPackages) {
                linkEl.textContent = "Contact sales";
                linkEl.href = "https://resources.shipup.co/en/offer/book-a-demo";
                linkEl.target = "_blank";
                linkEl.rel = "noreferrer";
                firstStepEl.style.display = "none";
                secondStepEl.style.display = "none";
                thirdStepEl.style.display = "block";
            }
            else {
                linkEl.textContent = "Create an account";
                linkEl.href = "https://app.shipup.co/signup";
                linkEl.removeAttribute("target");
                linkEl.removeAttribute("rel");
                if (pricing * packages < minPro) {
                    const priceEl = firstStepEl.querySelector("span#pro-price");
                    if (priceEl)
                        priceEl.textContent = formatPrice(minPro, 0, "en", currencyEur ? "EUR" : "USD");
                    firstStepEl.style.display = "block";
                    secondStepEl.style.display = "none";
                    thirdStepEl.style.display = "none";
                }
                else {
                    const priceElpp = secondStepEl.querySelector("span#pro-price-second-step");
                    const priceElpm = secondStepEl.querySelector("span#second-step-pro-per-month");
                    if (priceElpp)
                        priceElpp.textContent = formatPrice(pricing, 2, "en", currencyEur ? "EUR" : "USD");
                    if (priceElpm)
                        priceElpm.textContent = formatPrice(packages * pricing, 2, "en", currencyEur ? "EUR" : "USD");
                    firstStepEl.style.display = "none";
                    secondStepEl.style.display = "block";
                    thirdStepEl.style.display = "none";
                }
            }
        }
        // SDE
        if (sdeEl)
            sdeEl.textContent = formatPrice(pricing * sdeMultiple, 2, "en", currencyEur ? "EUR" : "USD");
        // Feedback
        if (feedbackEl)
            feedbackEl.textContent = formatPrice(pricing * feedbackMultiple, 2, "en", currencyEur ? "EUR" : "USD");
    };
    const callback = (mutationList) => {
        const { target } = mutationList[0];
        const val = Number(target.textContent);
        state.value = transform(val);
        calc();
    };
    const observer = new MutationObserver(callback);
    observer.observe(sliderValEl, {
        subtree: true,
        characterDataOldValue: true,
        childList: true,
    });
    const handleInputChange = (event) => {
        if (event.type === "input" && (event === null || event === void 0 ? void 0 : event.inputType)) {
            const trackWidth = trackEl === null || trackEl === void 0 ? void 0 : trackEl.clientWidth;
            let packages = 0;
            try {
                packages = Math.min(parseInt(dispValEl.value.replace(" ", ""), 10), maxPackages);
                packages = packages || 0;
                state.value = packages;
                {
                    dispValEl.value = packages
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    const sliderVal = reverse(packages);
                    sliderValEl.textContent = sliderVal + "";
                    const fillWidth = (sliderVal / maxPackages) * trackWidth;
                    const fillEl = trackEl.querySelector(".fs-rangeslider_fill");
                    if (fillEl)
                        fillEl.style.width = `${fillWidth}px`;
                    const handleEl = trackEl.querySelector(".fs-rangeslider_handle");
                    if (handleEl) {
                        handleEl.style.left = `${fillWidth}px`;
                        handleEl.setAttribute("aria-valuenow", Math.round(sliderVal) + "");
                    }
                }
                calc();
            }
            catch (e) {
                console.error(e);
            }
        }
    };
    formEl === null || formEl === void 0 ? void 0 : formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    // @ts-ignore
    dispValEl.addEventListener("input", handleInputChange);
    dispValEl.addEventListener("change", (ev) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        ev.stopPropagation();
    });
    $("#country").on("change", function () {
        const val = $(this).val();
        state.currencyEur = val === "EUR";
        calc();
    });
    calc();
});
