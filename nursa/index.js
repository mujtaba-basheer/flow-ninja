window.addEventListener("load", () => {
    const formEl = document.querySelector("form#notify-me-test-form");
    if (formEl) {
        formEl.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            // console.log("submitted...");
            try {
                const formData = {
                    "facility-name": "",
                    email: "",
                    facilities: [],
                };
                const nameEl = formEl.querySelector("input#facility-name");
                if (nameEl)
                    formData["facility-name"] = nameEl.value;
                const emailEl = formEl.querySelector("input#email");
                if (emailEl)
                    formData.email = emailEl.value;
                const facilities = [];
                const checkboxEls = formEl.querySelectorAll(`input[type="checkbox"]`);
                checkboxEls.forEach((checkboxEl) => {
                    var _a;
                    if (checkboxEl.checked) {
                        const spanEl = checkboxEl.nextElementSibling;
                        if (spanEl && spanEl.textContent) {
                            facilities.push((_a = spanEl.textContent) === null || _a === void 0 ? void 0 : _a.trim());
                        }
                    }
                });
                formData.facilities = facilities;
                console.log(JSON.stringify(formData));
                const req = await fetch("https://covzvcy1lb.execute-api.us-east-1.amazonaws.com/prod/multi-step-form", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const resp = await req.json();
                console.log(`Response Received:`, resp);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
});
