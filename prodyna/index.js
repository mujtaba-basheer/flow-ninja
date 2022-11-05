const state = {
    items: [],
    inputEl: null,
    autoEl: null,
};
const slugify = (s) => s.trim().toLowerCase().split(" ").join("-");
const handleInput = () => {
    const { items, inputEl, autoEl } = state;
    if (inputEl && autoEl) {
        const value = inputEl.value;
        if (value) {
            const result = items.find((x) => x.value.original.startsWith(value));
            if (result) {
                autoEl.textContent = result.value.original;
                if (result.value.original !== value) {
                    autoEl.setAttribute("tabindex", "0");
                }
                else
                    autoEl.removeAttribute("tabindex");
            }
            else {
                autoEl.textContent = "";
                autoEl.removeAttribute("tabindex");
            }
            const valueSlug = slugify(value);
            for (const item of items) {
                if (item.value.slug.includes(valueSlug)) {
                    item.element.classList.remove("search-item-out");
                }
                else {
                    item.element.classList.add("search-item-out");
                }
            }
        }
        else {
            autoEl.textContent = "";
            autoEl.removeAttribute("tabindex");
            for (const item of items) {
                item.element.classList.remove("search-item-out");
            }
        }
    }
};
const handleSubmit = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const { inputEl } = state;
    if (inputEl) {
        const value = inputEl.value;
        if (value) {
            window.location.href = `https://${window.location.hostname}/search?query=${encodeURIComponent(value)}`;
        }
    }
};
const handleFocus = () => {
    const { inputEl, autoEl } = state;
    if (inputEl && autoEl) {
        const autoText = autoEl.textContent;
        if (autoText) {
            inputEl.value = autoText;
            inputEl.focus({ preventScroll: true });
        }
    }
};
window.addEventListener("load", () => {
    var _a;
    // adding elements and values to state
    const itemEls = document.querySelectorAll("a.search-item");
    for (const itemEl of itemEls) {
        const value = ((_a = itemEl === null || itemEl === void 0 ? void 0 : itemEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        state.items.push({
            element: itemEl,
            value: {
                original: value,
                slug: value.toLowerCase().split(" ").join("-"),
            },
        });
    }
    const inputEl = document.getElementById("search");
    if (inputEl) {
        state.inputEl = inputEl;
        // creating autocomplete element
        const parentEl = inputEl.parentElement;
        if (parentEl) {
            parentEl.style.position = "relative";
            const autoEl = document.createElement("div");
            autoEl.classList.add("autocomplete");
            autoEl.setAttribute("tabindex", "0");
            inputEl.after(autoEl);
            state.autoEl = autoEl;
            // handling tab focus
            autoEl.addEventListener("focus", handleFocus);
        }
        // adding event listener on input
        inputEl.addEventListener("input", handleInput);
        // adding submit listener on form
        const formEl = document.querySelector("form.search-bar.w-form");
        if (formEl) {
            formEl.reset();
            formEl.addEventListener("submit", handleSubmit);
        }
    }
});
