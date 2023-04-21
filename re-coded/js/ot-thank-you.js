window.addEventListener("load", async () => {
    try {
        const sp = new URLSearchParams(window.location.search);
        const amount = sp.get("amount");
        const ref = sp.get("ref");
        const name = sp.get("name");
        const methodEl = document.getElementById("payment-method");
        if (methodEl)
            methodEl.textContent = "Card";
        if (amount && ref && name) {
            const amountEl = document.getElementById("amount");
            if (amountEl)
                amountEl.textContent = `$${amount}`;
            const refEl = document.getElementById("reference-number");
            if (refEl)
                refEl.textContent = ref;
            const nameEl = document.getElementById("donate-thank-you-name");
            if (nameEl)
                nameEl.textContent = `Thank you, ${name}`;
        }
    }
    catch (error) {
        console.error(error);
    }
});
