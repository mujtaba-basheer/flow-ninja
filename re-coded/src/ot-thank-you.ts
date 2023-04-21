window.addEventListener("load", async () => {
  try {
    const sp = new URLSearchParams(window.location.search);
    const amount = sp.get("amount");
    const ref = sp.get("ref");
    const name = sp.get("name");

    const methodEl = document.getElementById(
      "payment-method"
    ) as HTMLParagraphElement | null;
    if (methodEl) methodEl.textContent = "Card";

    if (amount && ref && name) {
      const amountEl = document.getElementById(
        "amount"
      ) as HTMLDivElement | null;
      if (amountEl) amountEl.textContent = `$${amount}`;

      const refEl = document.getElementById(
        "reference-number"
      ) as HTMLDivElement | null;
      if (refEl) refEl.textContent = ref;

      const nameEl = document.getElementById(
        "donate-thank-you-name"
      ) as HTMLHeadingElement | null;
      if (nameEl) nameEl.textContent = `Thank you, ${name}`;
    }
  } catch (error) {
    console.error(error);
  }
});
