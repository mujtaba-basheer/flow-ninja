window.addEventListener("load", () => {
    const state = {
        payment_mode: "one-time",
        f_amount: 20,
        c_amount: 0,
        name: "",
        email: "",
        card_no: "",
        exp_date: "12/24",
        cvc: 0,
        processing: false,
    };
    // @ts-ignore
    const Cleave = (window.Cleave || {});
    // @ts-ignore
    const Stripe = (window.Stripe || {});
    const stripe = Stripe("pk_test_mVVaQhzgWyXzAHLG3a79dw0t");
    const formEl = document.getElementById("wf-form-Donate");
    if (formEl) {
        formEl.reset();
        // Payment Mode Buttons
        {
            const buttonEls = formEl.querySelectorAll("div.donate-small a");
            const bE = buttonEls.item(0);
            if (bE) {
                bE.classList.remove("button-variant-small");
                bE.classList.add("button-small");
            }
            buttonEls.forEach((buttonEl) => {
                buttonEl.addEventListener("click", (ev) => {
                    var _a;
                    ev.preventDefault();
                    const mode = (_a = buttonEl.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
                    state.payment_mode = mode;
                    buttonEls.forEach((bE) => {
                        if (bE === buttonEl) {
                            bE.classList.remove("button-variant-small");
                            bE.classList.add("button-small");
                        }
                        else {
                            bE.classList.add("button-variant-small");
                            bE.classList.remove("button-small");
                        }
                    });
                });
            });
        }
        // Fixed Amount Buttons
        {
            const buttonEls = formEl.querySelectorAll("div.donate-options-wrapper a");
            const bE = buttonEls.item(0);
            if (bE)
                bE.classList.add("active");
            buttonEls.forEach((buttonEl) => {
                buttonEl.addEventListener("click", (ev) => {
                    var _a;
                    ev.preventDefault();
                    const amount = (_a = buttonEl.textContent) === null || _a === void 0 ? void 0 : _a.trim().replace("$", "");
                    buttonEls.forEach((bE) => {
                        if (bE === buttonEl) {
                            const inputEl = formEl.querySelector("input#custom-amount");
                            if (bE.classList.contains("active")) {
                                state.f_amount = 0;
                                // if (inputEl) inputEl.setAttribute("required", "true");
                            }
                            else {
                                state.f_amount = state.c_amount = +amount;
                                // state.c_amount = 0;
                                if (inputEl) {
                                    // inputEl.removeAttribute("required");
                                    inputEl.value = amount;
                                    const errorEl = inputEl.nextElementSibling;
                                    if (errorEl)
                                        errorEl.classList.add("hide");
                                }
                                bE.classList.add("active");
                            }
                            // bE.classList.toggle("active");
                        }
                        else
                            bE.classList.remove("active");
                    });
                });
            });
        }
        // Custom Amount
        {
            const inputEl = formEl.querySelector("input#custom-amount");
            if (inputEl) {
                inputEl.setAttribute("step", "0.01");
                const errorEl = inputEl.nextElementSibling;
                const buttonEls = formEl.querySelectorAll("div.donate-options-wrapper a");
                inputEl.addEventListener("input", () => {
                    const regex = /^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
                    const rawInput = inputEl.value;
                    if (regex.test(rawInput)) {
                        const num = Number(rawInput);
                        if (num >= 0.5) {
                            state.c_amount = num;
                            if (errorEl)
                                errorEl.classList.add("hide");
                            buttonEls.forEach((bE) => bE.classList.remove("active"));
                        }
                        else if (errorEl) {
                            errorEl.textContent = "Amount should not be less than $0.50";
                            errorEl.classList.remove("hide");
                        }
                    }
                    else {
                        inputEl.value = rawInput.replace(/\-/g, "");
                        if (errorEl) {
                            errorEl.textContent = "Please enter a valid positive number";
                            errorEl.classList.remove("hide");
                        }
                    }
                });
            }
        }
        // Name on Card
        {
            const inputEl = formEl.querySelector("input#name-on-card");
            if (inputEl) {
                inputEl.addEventListener("input", () => {
                    const value = inputEl.value;
                    state.name = value;
                    const errorEl = inputEl.nextElementSibling;
                    if (errorEl) {
                        if (value)
                            errorEl.classList.add("hide");
                        else {
                            errorEl.textContent = "This field is required";
                            errorEl.classList.remove("hide");
                        }
                    }
                });
            }
        }
        // Email
        {
            const inputEl = formEl.querySelector("input#email");
            if (inputEl) {
                inputEl.addEventListener("input", () => {
                    const value = inputEl.value;
                    state.email = value;
                    const errorEl = inputEl.nextElementSibling;
                    if (errorEl) {
                        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/g;
                        if (regex.test(value))
                            errorEl.classList.add("hide");
                        else {
                            errorEl.classList.remove("hide");
                            if (value)
                                errorEl.textContent = "Please enter a valid email address.";
                            else
                                errorEl.textContent = "This field is required.";
                        }
                    }
                });
            }
        }
        // Card Number
        {
            const inputEl = formEl.querySelector("input#card-number");
            if (inputEl) {
                const errorEl = inputEl.nextElementSibling;
                const cleave = new Cleave(inputEl, {
                    creditCard: true,
                    onValueChanged: (e) => {
                        toggleError(false);
                        const value = e.target.rawValue;
                        state.card_no = value;
                        if (errorEl) {
                            if (value && value.length >= 10)
                                errorEl.classList.add("hide");
                            else {
                                errorEl.textContent = value
                                    ? "Please enter a valid card number."
                                    : "This field is required.";
                                errorEl.classList.remove("hide");
                            }
                        }
                    },
                });
            }
        }
        // Expiry Date
        {
            const inputEl = formEl.querySelector("input#mm-aa");
            if (inputEl) {
                const errorEl = inputEl.nextElementSibling;
                const cleave = new Cleave(inputEl, {
                    date: true,
                    datePattern: ["m", "y"],
                    // dateMin: new Date().toISOString().substring(0, 10),
                    onValueChanged: (e) => {
                        toggleError(false);
                        const value = e.target.rawValue;
                        state.exp_date = value;
                        if (errorEl) {
                            const regex = /[0-9]{4}/g;
                            if (regex.test(value))
                                errorEl.classList.add("hide");
                            else {
                                errorEl.classList.remove("hide");
                                if (value)
                                    errorEl.textContent = "Please enter a valid expiry date.";
                                else
                                    errorEl.textContent = "This field is required.";
                            }
                        }
                    },
                });
            }
        }
        // CVC
        {
            const inputEl = formEl.querySelector("input#cvc");
            if (inputEl) {
                inputEl.setAttribute("maxlength", "4");
                inputEl.setAttribute("minlength", "3");
                const errorEl = inputEl.nextElementSibling;
                const cleave = new Cleave(inputEl, {
                    numericOnly: true,
                    blocks: [4],
                    onValueChanged: (e) => {
                        toggleError(false);
                        const value = e.target.rawValue;
                        state.cvc = +value;
                        if (errorEl) {
                            if (value.length >= 3)
                                errorEl.classList.add("hide");
                            else {
                                errorEl.textContent = "Please enter a valid CVC code.";
                                errorEl.classList.remove("hide");
                            }
                        }
                    },
                });
            }
        }
        const toggleError = (show, msg) => {
            const errorEl = formEl.querySelector("div#error-div");
            if (errorEl) {
                if (!show)
                    errorEl.classList.add("hide");
                else {
                    errorEl.classList.remove("hide");
                    const textEl = errorEl.querySelector("div#error-text");
                    if (textEl && msg)
                        textEl.textContent = msg;
                }
            }
        };
        toggleError(false);
        formEl.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            toggleError(false);
            const submitBtn = formEl.querySelector("input#submit");
            if (state.processing)
                return;
            else {
                state.processing = true;
                if (submitBtn)
                    submitBtn.value = "Processing...";
            }
            // console.log(JSON.stringify(state));
            const { c_amount, f_amount, email, card_no, cvc, exp_date, name } = state;
            try {
                let intentBody = JSON.stringify({
                    amount: (c_amount || f_amount) * 100,
                    email,
                });
                const intentReq = await fetch("https://ktb4manlgh.execute-api.us-east-1.amazonaws.com/prod/payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": intentBody.length + "",
                    },
                    body: intentBody,
                });
                const intentResp = await intentReq.json();
                if (intentResp.status) {
                    const { data: { clientSecret: intentSecret }, } = intentResp;
                    // let [exp_month, exp_year] = exp_date.split("/");
                    const exp_month = exp_date.substring(0, 2);
                    const exp_year = exp_date.substring(2);
                    const paymentMethodBody = JSON.stringify({
                        number: card_no,
                        cvc,
                        exp_month: +exp_month,
                        exp_year: +`20${exp_year}`,
                        email,
                        name,
                    });
                    const paymentMethodReq = await fetch("https://ktb4manlgh.execute-api.us-east-1.amazonaws.com/prod/payment-method", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Content-Length": paymentMethodBody.length + "",
                        },
                        body: paymentMethodBody,
                    });
                    const paymentMethodResp = await paymentMethodReq.json();
                    // console.log("paymentMethodResp:", paymentMethodResp);
                    if (paymentMethodResp.status) {
                        const confirmResult = await stripe.confirmCardPayment(intentSecret, {
                            payment_method: paymentMethodResp.data.id,
                        }, {
                            handleActions: true,
                        });
                        // console.log("confirmResult:", confirmResult);
                        const { paymentIntent, error: cardError } = confirmResult;
                        if (paymentIntent && paymentIntent.status === "succeeded") {
                            // console.log(JSON.stringify(paymentIntent));
                            const { amount, id } = paymentIntent;
                            window.location.href = `${window.location.protocol}//${window.location.hostname}/donate-thank-you?name=${encodeURIComponent(name)}&amount=${amount / 100}&ref=${encodeURIComponent(id)}`;
                        }
                        else {
                            console.error(new Error(cardError.code));
                            throw new Error(cardError.message);
                        }
                    }
                    else {
                        // alert(paymentMethodResp.message);
                        throw new Error(paymentMethodResp.message);
                    }
                }
            }
            catch (error) {
                console.error(error);
                toggleError(true, error.message);
            }
            state.processing = false;
            if (submitBtn)
                submitBtn.value = "Donate";
        });
    }
});
