window.addEventListener("load", () => {
    const formEls = document.querySelectorAll(`form[form-validation="true"]`);
    const state = new Array(formEls.length);
    const validateForm = (formEl, index, onSubmit) => {
        var _a, _b, _c, _d, _e, _f, _g;
        state[index] = true;
        (_b = (_a = formEl
            .querySelector(`input[type="submit"]`)) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove("filled-form");
        // managing input fields
        const inputFields = formEl.querySelectorAll(`input.w-input:not([type="submit"])`);
        for (const inputField of inputFields) {
            let flag = true;
            if (inputField.hasAttribute("required") &&
                inputField.getAttribute("required") !== "false" &&
                !inputField.value) {
                flag = false;
                state[index] = false;
                if (!onSubmit)
                    return;
            }
            // handling email inputs
            if (flag && inputField.type === "email") {
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
                flag = re.test(inputField.value);
            }
            // handling patterns
            const inputPattern = inputField.getAttribute("pattern");
            if (flag && inputPattern) {
                flag = inputField.value.startsWith(inputPattern);
            }
            if (!flag) {
                state[index] = false;
                if (!onSubmit)
                    return;
            }
            // changing UI as per validation result
            const errorEl = inputField.nextElementSibling;
            if (flag) {
                inputField.classList.remove("error");
                if (errorEl) {
                    errorEl.classList.remove("error-active");
                    errorEl.classList.add("no-error");
                }
            }
            else {
                inputField.classList.add("error");
                if (errorEl) {
                    errorEl.classList.add("error-active");
                    errorEl.classList.remove("no-error");
                }
            }
        }
        // managing select dropdowns
        const selectFields = formEl.querySelectorAll("select.w-select");
        for (const selectField of selectFields) {
            const nextEl = selectField.nextElementSibling;
            if (nextEl) {
                if (nextEl.classList.contains("nice-select")) {
                    let flag = true;
                    if (selectField.hasAttribute("required") &&
                        selectField.getAttribute("required") !== "false" &&
                        !selectField.value) {
                        flag = false;
                    }
                    if (!flag) {
                        state[index] = false;
                        if (!onSubmit)
                            return;
                    }
                    // changing UI as per validation result
                    const errorEl = nextEl.nextElementSibling;
                    if (flag) {
                        nextEl.classList.remove("error");
                        nextEl.classList.add("selected");
                        if (errorEl) {
                            errorEl.classList.remove("error-active");
                            errorEl.classList.add("no-error");
                        }
                    }
                    else {
                        nextEl.classList.add("error");
                        nextEl.classList.remove("selected");
                        if (errorEl) {
                            errorEl.classList.add("error-active");
                            errorEl.classList.remove("no-error");
                        }
                    }
                }
                else {
                    let flag = true;
                    if (selectField.hasAttribute("required") &&
                        selectField.getAttribute("required") !== "false" &&
                        !selectField.value) {
                        flag = false;
                    }
                    if (!flag) {
                        state[index] = false;
                        if (!onSubmit)
                            return;
                    }
                    // changing UI as per validation result
                    const errorEl = nextEl;
                    if (flag) {
                        selectField.classList.remove("error");
                        selectField.classList.add("selected");
                        errorEl.classList.remove("error-active");
                        errorEl.classList.add("no-error");
                    }
                    else {
                        selectField.classList.add("error");
                        selectField.classList.remove("selected");
                        errorEl.classList.add("error-active");
                        errorEl.classList.remove("no-error");
                    }
                }
            }
        }
        // managing radio buttons
        const radioGrps = formEl.querySelectorAll("div.radio-wrapper");
        for (const radioGrp of radioGrps) {
            let flag = false;
            const radioBtns = radioGrp.querySelectorAll(`input[type="radio"]`);
            for (const radioBtn of radioBtns) {
                if (radioBtn.checked)
                    flag = true;
            }
            if (!flag) {
                state[index] = false;
                if (!onSubmit)
                    return;
            }
            // changing UI as per validation result
            const errorEl = radioGrp.querySelector(`div[error-label="Radio"]`);
            if (flag) {
                radioBtns.forEach((radioBtn) => radioBtn.classList.remove("error"));
                if (errorEl) {
                    errorEl.classList.remove("error-active");
                    errorEl.classList.add("no-error");
                }
            }
            else {
                radioBtns.forEach((radioBtn) => radioBtn.classList.add("error"));
                if (errorEl) {
                    errorEl.classList.add("error-active");
                    errorEl.classList.remove("no-error");
                }
            }
        }
        // managing checkboxes
        const checkboxEls = formEl.querySelectorAll(`div.checkbox-wrapper input[type="checkbox"]`);
        for (const checkboxEl of checkboxEls) {
            let flag = true;
            if (checkboxEl.hasAttribute("required") &&
                checkboxEl.getAttribute("required") !== "false" &&
                !checkboxEl.checked) {
                flag = false;
            }
            if (!flag) {
                state[index] = false;
                if (!onSubmit)
                    return;
            }
            // changing UI as per validation result
            const errorEl = (_c = checkboxEl === null || checkboxEl === void 0 ? void 0 : checkboxEl.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling;
            if (flag) {
                checkboxEl.classList.remove("error");
                if (errorEl) {
                    errorEl.classList.remove("error-active");
                    errorEl.classList.add("no-error");
                }
            }
            else {
                checkboxEl.classList.add("error");
                if (errorEl) {
                    errorEl.classList.add("error-active");
                    errorEl.classList.remove("no-error");
                }
            }
        }
        // managing textareas
        const textAreas = formEl.querySelectorAll("textarea.w-input");
        for (const textArea of textAreas) {
            let flag = true;
            if (textArea.hasAttribute("required") &&
                textArea.getAttribute("required") !== "false" &&
                !textArea.value) {
                flag = false;
            }
            if (!flag) {
                state[index] = false;
                if (!onSubmit)
                    return;
            }
            // changing UI as per validation result
            const errorEl = textArea.nextElementSibling;
            if (flag) {
                textArea.classList.remove("error");
                if ((errorEl === null || errorEl === void 0 ? void 0 : errorEl.getAttribute("error-label")) === "message") {
                    errorEl.classList.remove("error-active");
                    errorEl.classList.add("no-error");
                }
            }
            else {
                textArea.classList.add("error");
                if ((errorEl === null || errorEl === void 0 ? void 0 : errorEl.getAttribute("error-label")) === "message") {
                    errorEl.classList.add("error-active");
                    errorEl.classList.remove("no-error");
                }
            }
        }
        (_e = (_d = formEl
            .querySelector(`input[type="submit"]`)) === null || _d === void 0 ? void 0 : _d.classList) === null || _e === void 0 ? void 0 : _e[state[index] ? "add" : "remove"]("filled-form");
        (_g = (_f = formEl.querySelector(`input[type="submit"]`)) === null || _f === void 0 ? void 0 : _f.classList) === null || _g === void 0 ? void 0 : _g.remove("no-error");
    };
    for (let i = 0; i < formEls.length; i++) {
        const formEl = formEls[i];
        formEl.reset();
        state[i] = false;
        // removing HTML tooltips
        formEl.setAttribute("novalidate", "");
        // managing input fields
        const inputFields = formEl.querySelectorAll(`input.w-input:not([type="submit"])`);
        for (const inputField of inputFields) {
            inputField.addEventListener("input", () => {
                let flag = true;
                if (inputField.hasAttribute("required") &&
                    inputField.getAttribute("required") !== "false" &&
                    !inputField.value) {
                    flag = false;
                }
                // handling email inputs
                if (flag && inputField.type === "email") {
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
                    flag = re.test(inputField.value);
                }
                // handling patterns
                const inputPattern = inputField.getAttribute("pattern");
                if (flag && inputPattern) {
                    flag = inputField.value.startsWith(inputPattern);
                }
                // changing UI as per validation result
                const errorEl = inputField.nextElementSibling;
                if (flag) {
                    inputField.classList.remove("error");
                    if (errorEl) {
                        errorEl.classList.remove("error-active");
                        errorEl.classList.add("no-error");
                    }
                }
                else {
                    inputField.classList.add("error");
                    if (errorEl) {
                        errorEl.classList.add("error-active");
                        errorEl.classList.remove("no-error");
                    }
                }
                validateForm(formEl, i);
            });
        }
        // managing select dropdowns
        const selectFields = formEl.querySelectorAll("select.w-select");
        for (const selectField of selectFields) {
            const nextEl = selectField.nextElementSibling;
            if (nextEl) {
                if (nextEl.classList.contains("nice-select")) {
                    $(selectField).on("change", function () {
                        let flag = true;
                        if (selectField.hasAttribute("required") &&
                            selectField.getAttribute("required") !== "false" &&
                            !selectField.value) {
                            flag = false;
                        }
                        // changing UI as per validation result
                        const errorEl = nextEl.nextElementSibling;
                        if (flag) {
                            nextEl.classList.remove("error");
                            nextEl.classList.add("selected");
                            if (errorEl) {
                                errorEl.classList.remove("error-active");
                                errorEl.classList.add("no-error");
                            }
                        }
                        else {
                            nextEl.classList.add("error");
                            nextEl.classList.remove("selected");
                            if (errorEl) {
                                errorEl.classList.add("error-active");
                                errorEl.classList.remove("no-error");
                            }
                        }
                        validateForm(formEl, i);
                    });
                }
                else {
                    selectField.addEventListener("change", () => {
                        let flag = true;
                        if (selectField.hasAttribute("required") &&
                            selectField.getAttribute("required") !== "false" &&
                            !selectField.value) {
                            flag = false;
                        }
                        // changing UI as per validation result
                        const errorEl = nextEl;
                        if (flag) {
                            selectField.classList.remove("error");
                            selectField.classList.add("selected");
                            errorEl.classList.remove("error-active");
                            errorEl.classList.add("no-error");
                        }
                        else {
                            selectField.classList.add("error");
                            selectField.classList.remove("selected");
                            errorEl.classList.add("error-active");
                            errorEl.classList.remove("no-error");
                        }
                        validateForm(formEl, i);
                    });
                }
            }
        }
        // managing radio buttons
        const radioGrps = formEl.querySelectorAll("div.radio-wrapper");
        for (const radioGrp of radioGrps) {
            const radioBtns = radioGrp.querySelectorAll(`input[type="radio"]`);
            for (const radioBtn of radioBtns) {
                radioBtn.addEventListener("change", () => {
                    if (radioBtn.checked) {
                        const errorEl = radioGrp.querySelector(`div[error-label="Radio"]`);
                        if (errorEl) {
                            errorEl.classList.remove("error-active");
                            errorEl.classList.add("no-error");
                        }
                        radioBtns.forEach((radioBtn) => radioBtn.classList.remove("error"));
                    }
                    validateForm(formEl, i);
                });
            }
        }
        // managing checkboxes
        const checkboxEls = document.querySelectorAll(`div.checkbox-wrapper input[type="checkbox"]`);
        for (const checkboxEl of checkboxEls) {
            checkboxEl.addEventListener("change", () => {
                var _a;
                let flag = true;
                if (checkboxEl.hasAttribute("required") &&
                    checkboxEl.getAttribute("required") !== "false" &&
                    !checkboxEl.checked) {
                    flag = false;
                }
                // changing UI as per validation result
                const errorEl = (_a = checkboxEl === null || checkboxEl === void 0 ? void 0 : checkboxEl.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
                if (flag) {
                    checkboxEl.classList.remove("error");
                    if (errorEl) {
                        errorEl.classList.remove("error-active");
                        errorEl.classList.add("no-error");
                    }
                }
                else {
                    checkboxEl.classList.add("error");
                    if (errorEl) {
                        errorEl.classList.add("error-active");
                        errorEl.classList.remove("no-error");
                    }
                }
                validateForm(formEl, i);
            });
        }
        // managing textareas
        const textAreas = formEl.querySelectorAll("textarea.w-input");
        for (const textArea of textAreas) {
            textArea.addEventListener("input", () => {
                let flag = true;
                if (textArea.hasAttribute("required") &&
                    textArea.getAttribute("required") !== "false" &&
                    !textArea.value) {
                    flag = false;
                }
                // changing UI as per validation result
                const errorEl = textArea.nextElementSibling;
                if (flag) {
                    textArea.classList.remove("error");
                    if ((errorEl === null || errorEl === void 0 ? void 0 : errorEl.getAttribute("error-label")) === "message") {
                        errorEl.classList.remove("error-active");
                        errorEl.classList.add("no-error");
                    }
                }
                else {
                    textArea.classList.add("error");
                    if ((errorEl === null || errorEl === void 0 ? void 0 : errorEl.getAttribute("error-label")) === "message") {
                        errorEl.classList.add("error-active");
                        errorEl.classList.remove("no-error");
                    }
                }
                validateForm(formEl, i);
            });
        }
        // handling submit
        formEl.addEventListener("submit", (ev) => {
            if (!state[i]) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                ev.stopPropagation();
                validateForm(formEl, i, true);
            }
        });
    }
});
